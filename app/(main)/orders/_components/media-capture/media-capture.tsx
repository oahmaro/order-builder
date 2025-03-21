'use client';

import { modals } from '@mantine/modals';
import { useRef, useEffect, useReducer, useCallback } from 'react';
import { notifications } from '@mantine/notifications';
import { Button, Image, Stack, ActionIcon } from '@mantine/core';
import { IconCamera, IconUpload, IconX, IconCameraRotate } from '@tabler/icons-react';

import classes from './media-capture.module.css';
import { mediaCaptureContent, MediaCaptureContentPhrases } from './media-capture.content';

interface MediaCaptureProps {
  value?: string;
  fallbackSrc?: string;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  onCapture: (file: File | undefined) => Promise<void>;
}

const mediaReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'setIsCameraActive':
      return { ...state, isCameraActive: action.payload };
    case 'setCurrentDeviceId':
      return { ...state, currentDeviceId: action.payload };
    case 'setAvailableDevices':
      return { ...state, availableDevices: action.payload };
    case 'setLocalImageUrl':
      return { ...state, localImageUrl: action.payload };
    default:
      return state;
  }
};

export default function MediaCapture({
  value,
  onCapture,
  width = 400,
  height = 300,
  disabled = false,
  fallbackSrc = 'https://placehold.co/600x400?text=Click+to+upload',
}: MediaCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(mediaReducer, {
    isCameraActive: false,
    currentDeviceId: undefined,
    availableDevices: [],
    localImageUrl: value,
  });

  useEffect(() => {
    dispatch({ type: 'setLocalImageUrl', payload: value });
  }, [value]);

  const initializeCamera = async () => {
    try {
      // First request camera permissions explicitly
      const permissionStream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Stop this initial permission stream immediately after getting permissions
      permissionStream.getTracks().forEach((track) => track.stop());

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      dispatch({ type: 'setAvailableDevices', payload: videoDevices });
      if (videoDevices.length > 0) {
        dispatch({ type: 'setCurrentDeviceId', payload: videoDevices[0].deviceId });
      }
    } catch (error) {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR_ACCESSING_CAMERA),
        color: 'red',
      });
    }
  };

  const handleFileCapture = useCallback(
    async (file: File | undefined) => {
      if (!file) {
        dispatch({ type: 'setLocalImageUrl', payload: undefined });
        onCapture(undefined);
        return;
      }

      // Create local URL for preview
      const objectUrl = URL.createObjectURL(file);
      dispatch({ type: 'setLocalImageUrl', payload: objectUrl });

      // Pass the file to parent
      await onCapture(file);
    },
    [onCapture]
  );

  useEffect(
    () => () => {
      if (state.localImageUrl && !state.localImageUrl.startsWith('https://')) {
        URL.revokeObjectURL(state.localImageUrl);
      }
    },
    [state.localImageUrl]
  );

  const checkCameraSupport = useCallback(async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Camera API not supported');
      }

      await navigator.permissions.query({ name: 'camera' as PermissionName });

      return true;
    } catch (error) {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: error instanceof Error ? error.message : 'Camera support check failed',
        color: 'red',
      });
      return false;
    }
  }, []);

  const startCamera = async () => {
    try {
      if (!(await checkCameraSupport())) {
        return;
      }

      await initializeCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: state.currentDeviceId ? { exact: state.currentDeviceId } : undefined,
          width: { ideal: typeof width === 'number' ? width : parseInt(width as string, 10) },
          height: { ideal: typeof height === 'number' ? height : parseInt(height as string, 10) },
        },
      });

      streamRef.current = stream;
      dispatch({ type: 'setIsCameraActive', payload: true });

      await new Promise<void>((resolve) => {
        const checkVideoRef = () => {
          if (videoRef.current) {
            resolve();
          } else {
            requestAnimationFrame(checkVideoRef);
          }
        };
        requestAnimationFrame(checkVideoRef);
      });

      videoRef.current!.srcObject = stream;
      await videoRef.current!.play();
    } catch (error) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      dispatch({ type: 'setIsCameraActive', payload: false });

      const errorMessage =
        error instanceof Error
          ? error.message
          : mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR_ACCESSING_CAMERA);

      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: errorMessage,
        color: 'red',
      });
    }
  };

  const switchCamera = async () => {
    try {
      // Find next device
      const currentIndex = state.availableDevices.findIndex(
        (device: MediaDeviceInfo) => device.deviceId === state.currentDeviceId
      );
      const nextIndex = (currentIndex + 1) % state.availableDevices.length;
      const nextDevice = state.availableDevices[nextIndex];

      // Stop current stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      }

      // Update device ID and wait for state to update
      dispatch({ type: 'setCurrentDeviceId', payload: nextDevice.deviceId });

      // Start new stream with selected device
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: nextDevice.deviceId },
          width: { ideal: typeof width === 'number' ? width : parseInt(width as string, 10) },
          height: { ideal: typeof height === 'number' ? height : parseInt(height as string, 10) },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR_ACCESSING_CAMERA),
        color: 'red',
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      dispatch({ type: 'setIsCameraActive', payload: false });
    }
  };

  const capturePhoto = async () => {
    if (!videoRef.current || !streamRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(videoRef.current, 0, 0);

      stopCamera();

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('Failed to create blob'));
        });
      });

      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

      await handleFileCapture(file);
    } catch (error) {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR_TAKING_PHOTO),
        color: 'red',
      });
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    // Ensure we stop any active stream when component unmounts
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    // Clean up any object URLs
    if (state.localImageUrl && !state.localImageUrl.startsWith('https://')) {
      URL.revokeObjectURL(state.localImageUrl);
    }

    return () => {
      abortController.abort();
      // Ensure we stop any active stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
        streamRef.current = null;
      }

      // Clean up any object URLs
      if (state.localImageUrl && !state.localImageUrl.startsWith('https://')) {
        URL.revokeObjectURL(state.localImageUrl);
      }
    };
  }, []);

  useEffect(() => {
    const handleError = () => {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: 'Video playback error occurred',
        color: 'red',
      });
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('error', handleError);
      return () => {
        videoElement.removeEventListener('error', handleError);
        return undefined;
      };
    }
    return undefined;
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.uploadContainer}>
        {state.isCameraActive ? (
          <Stack gap="xs">
            <div className={classes.videoContainer}>
              <video ref={videoRef} autoPlay playsInline muted className={classes.video} />

              <ActionIcon
                className={classes.removeButton}
                variant="filled"
                size="md"
                onClick={stopCamera}
              >
                <IconX size={16} />
              </ActionIcon>

              <Button
                className={classes.captureButton}
                variant="filled"
                onClick={capturePhoto}
                leftSection={<IconCamera size={16} />}
              >
                {mediaCaptureContent.t(MediaCaptureContentPhrases.CAPTURE)}
              </Button>

              {state.availableDevices.length > 1 && (
                <ActionIcon
                  className={classes.switchCameraButton}
                  variant="filled"
                  size="lg"
                  onClick={switchCamera}
                >
                  <IconCameraRotate size={18} />
                </ActionIcon>
              )}
            </div>
          </Stack>
        ) : !state.localImageUrl ? (
          <div className={classes.buttonContainer}>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={classes.hiddenInput}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileCapture(file);
                }
              }}
            />
            <Stack gap="xs">
              <Button
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className={classes.uploadButton}
                leftSection={<IconUpload size={16} />}
                disabled={disabled}
              >
                {mediaCaptureContent.t(MediaCaptureContentPhrases.UPLOAD_IMAGE)}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={startCamera}
                className={classes.uploadButton}
                leftSection={<IconCamera size={16} />}
                disabled={disabled}
              >
                {mediaCaptureContent.t(MediaCaptureContentPhrases.TAKE_PHOTO)}
              </Button>
            </Stack>
          </div>
        ) : (
          <div className={classes.imageContainer}>
            <Image
              src={state.localImageUrl}
              fallbackSrc={fallbackSrc}
              className={classes.image}
              onError={(e) => {
                e.currentTarget.src = fallbackSrc;
              }}
              onClick={() => {
                if (state.localImageUrl) {
                  modals.open({
                    centered: true,
                    styles: { header: { display: 'none' }, body: { padding: '0' } },
                    size: 'lg',
                    children: (
                      <Image
                        src={state.localImageUrl}
                        fit="contain"
                        pos="relative"
                        top="0"
                        bottom="0"
                        onError={(e) => {
                          e.currentTarget.src = fallbackSrc;
                        }}
                      />
                    ),
                  });
                }
              }}
            />
            <ActionIcon
              variant="filled"
              color="red"
              size="md"
              radius="xl"
              className={classes.removeButton}
              disabled={disabled}
              onClick={async () => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                dispatch({ type: 'setLocalImageUrl', payload: undefined });
                await onCapture(undefined);
              }}
            >
              <IconX size={18} />
            </ActionIcon>
          </div>
        )}
      </div>
    </div>
  );
}
