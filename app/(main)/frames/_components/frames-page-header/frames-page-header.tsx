import { PageHeader } from '@/components';
import { framesPageHeaderContent, FramesPageHeaderPhrases } from './frames-page-header.content';

export default function FramesPageHeader({ numberOfFrames }: { numberOfFrames: number }) {
  return (
    <PageHeader
      title={framesPageHeaderContent.t(FramesPageHeaderPhrases.TITLE)}
      subtitle={framesPageHeaderContent.t(FramesPageHeaderPhrases.SUBTITLE, numberOfFrames)}
      backPath="/"
    />
  );
}
