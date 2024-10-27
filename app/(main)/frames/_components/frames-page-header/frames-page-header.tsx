'use client';

import { modals } from '@mantine/modals';

import { PageHeader } from '@/components';
import { CreateFrameForm } from '../create-frame-form';
import FrameFormContainer from '../frame-form/frame-form.container';
import { framesPageHeaderContent, FramesPageHeaderPhrases } from './frames-page-header.content';

export default function FramesPageHeader({ numberOfFrames }: { numberOfFrames: number }) {
  return (
    <PageHeader
      title={framesPageHeaderContent.t(FramesPageHeaderPhrases.TITLE)}
      subtitle={framesPageHeaderContent.t(FramesPageHeaderPhrases.SUBTITLE, numberOfFrames)}
      backPath="/"
      actions={[
        {
          label: framesPageHeaderContent.t(FramesPageHeaderPhrases.ACTION),
          onClick: () =>
            modals.open({
              title: framesPageHeaderContent.t(FramesPageHeaderPhrases.MODAL_TITLE),
              size: 'xl',
              children: (
                <FrameFormContainer>
                  <CreateFrameForm />
                </FrameFormContainer>
              ),
            }),
        },
      ]}
    />
  );
}
