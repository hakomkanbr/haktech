import Link from "next/link";
import React from "react";

export default function LinkElement({ href, title }: any) {
  return (
    <Link href={href}>
      <a>{title}</a>
    </Link>
  );
}
