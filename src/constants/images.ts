/** Shared image assets.
 *
 * Sources are stored pre-compressed (WebP) so the optimiser starts from a small
 * original and the very first, uncached request is already cheap. The inline
 * placeholder is a 16px-wide encode of the same photo — it ships in the HTML,
 * so the portrait's frame is filled the moment the markup lands instead of
 * flashing empty until the real file arrives.
 */

export const PORTRAIT_IMAGE = {
  src: "/Hero-Hemanth.webp",
  width: 1261,
  height: 1247,
  blurDataURL:
    "data:image/webp;base64,UklGRggBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSGYAAAARb6C2bRs25TlT74mIAFc+hZWpqsNVbNtustMTsBAJNBnYwAH/yEABEqqM3ttW8148RPR/AoDZNCF820R+HS+ryNM8cjukkZWLFFj+tQf81BYmqgOYBy2sgz5cg15HA5O92gPWah9WUDggfAAAAPABAJ0BKhAAEAADgFolpAAPhy+vhqLqgAD0BsZnZhokusMjScqq3rD3kRSvzkRtorJLAiyqfyfL8D+GDT96nleERHhQfrY3kMwX4//TlLc/DpXrWhFy3DAWA98QR3WXmRS8MmsKmxWUqGjq5Nas2mQib/VUPBNiDxAAAAA=",
} as const;
