"use client";

import { useMemo } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "./mdxComponents";

type MDXContentProps = {
  code: string;
};

function useMDXComponent(code: string) {
  return useMemo(() => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
  }, [code]);
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  // Component identity is stable via useMemo keyed on `code` — this is the
  // standard velite/contentlayer pattern for rendering precompiled MDX.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={mdxComponents} />;
}
