'use client';

import { useRef, useState, useEffect } from 'react';
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
  onCapture: (file: File | undefined) => Promise<void>;
}

export default function MediaCapture({
  value,
  onCapture,
  width = 400,
  height = 300,
  fallbackSrc = 'https://placehold.co/600x400?text=Click+to+upload',
}: MediaCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentDeviceId, setCurrentDeviceId] = useState<string>();
  const [availableDevices, setAvailableDevices] = useState<MediaDeviceInfo[]>([]);
  const [localImageUrl, setLocalImageUrl] = useState<string | undefined>(value);

  useEffect(() => {
    if (!localImageUrl) {
      setLocalImageUrl(value);
    }
  }, [value]);

  const initializeCamera = async () => {
    try {
      // First request camera permissions explicitly
      await navigator.mediaDevices.getUserMedia({ video: true });

      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      setAvailableDevices(videoDevices);
      if (videoDevices.length > 0) {
        setCurrentDeviceId(videoDevices[0].deviceId);
      }
    } catch (error) {
      notifications.show({
        title: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR),
        message: mediaCaptureContent.t(MediaCaptureContentPhrases.ERROR_ACCESSING_CAMERA),
        color: 'red',
      });
    }
  };

  const handleFileCapture = async (file: File | undefined) => {
    if (!file) {
      setLocalImageUrl(undefined);
      onCapture(undefined);
      return;
    }

    // Create local URL for preview
    const objectUrl = URL.createObjectURL(file);
    setLocalImageUrl(objectUrl);

    // Pass the file to parent
    await onCapture(file);
  };

  useEffect(
    () => () => {
      if (localImageUrl && !localImageUrl.startsWith('https://')) {
        URL.revokeObjectURL(localImageUrl);
      }
    },
    [localImageUrl]
  );

  const checkCameraSupport = async () => {
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
  };

  const startCamera = async () => {
    try {
      if (!(await checkCameraSupport())) {
        return;
      }

      await initializeCamera();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: currentDeviceId ? { exact: currentDeviceId } : undefined,
          width: { ideal: typeof width === 'number' ? width : parseInt(width as string, 10) },
          height: { ideal: typeof height === 'number' ? height : parseInt(height as string, 10) },
        },
      });

      streamRef.current = stream;
      setIsCameraActive(true);

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

      setIsCameraActive(false);

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
    const currentIndex = availableDevices.findIndex(
      (device) => device.deviceId === currentDeviceId
    );
    const nextIndex = (currentIndex + 1) % availableDevices.length;
    const nextDevice = availableDevices[nextIndex];

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setCurrentDeviceId(nextDevice.deviceId);
    await startCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraActive(false);
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

  useEffect(() => () => streamRef.current?.getTracks().forEach((track) => track.stop()), []);

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
        {isCameraActive ? (
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

              {availableDevices.length > 1 ||
                (true && (
                  <ActionIcon
                    className={`${classes.switchCameraButton} debug-switch-camera`}
                    variant="filled"
                    size="lg"
                    onClick={switchCamera}
                  >
                    <IconCameraRotate size={18} />
                  </ActionIcon>
                ))}
            </div>
          </Stack>
        ) : !localImageUrl ? (
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
                onClick={() => fileInputRef.current?.click()}
                className={classes.uploadButton}
                leftSection={<IconUpload size={16} />}
              >
                {mediaCaptureContent.t(MediaCaptureContentPhrases.UPLOAD_IMAGE)}
              </Button>

              <Button
                variant="outline"
                onClick={startCamera}
                className={classes.uploadButton}
                leftSection={<IconCamera size={16} />}
              >
                {mediaCaptureContent.t(MediaCaptureContentPhrases.TAKE_PHOTO)}
              </Button>
            </Stack>
          </div>
        ) : (
          <div className={classes.imageContainer}>
            <Image src={localImageUrl} fallbackSrc={fallbackSrc} className={classes.image} />
            <ActionIcon
              variant="filled"
              color="red"
              size="lg"
              radius="xl"
              className={classes.removeButton}
              onClick={async () => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                setLocalImageUrl(undefined);
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
