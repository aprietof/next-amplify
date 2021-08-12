/* eslint-disable react/no-danger */
import React, { ReactElement } from 'react';

export default function PostBody({ content }: { content: any }): ReactElement {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
