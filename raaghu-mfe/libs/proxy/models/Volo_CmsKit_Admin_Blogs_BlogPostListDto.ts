/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_CmsKit_Blogs_BlogPostStatus } from './Volo_CmsKit_Blogs_BlogPostStatus';

export type Volo_CmsKit_Admin_Blogs_BlogPostListDto = {
    id?: string;
    blogId?: string;
    blogName?: string | null;
    title?: string | null;
    slug?: string | null;
    shortDescription?: string | null;
    content?: string | null;
    coverImageMediaId?: string | null;
    creationTime?: string;
    lastModificationTime?: string | null;
    status?: Volo_CmsKit_Blogs_BlogPostStatus;
};
