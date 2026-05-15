"use client";

import { Fragment } from "react";
import { marked } from "marked";
import { AdSenseUnit } from "@/components/ads/AdSenseUnit";
import { CopyButton } from "./CopyButton";

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function ArticleContent({ content }: { content: string }) {
  const sections = content.split(/(?=^##\s)/gm).filter(Boolean);

  return (
    <div className="prose-editorial">
      <AdSenseUnit className="mt-0" />
      {sections.map((section, i) => {
        const sectionTitle = section.match(/^##\s+(.+)$/m)?.[1] ?? "";
        const isDiscursoBlock =
          /ejemplo|modelo|discurso/i.test(sectionTitle) ||
          /Queridos|Buenas|Estimados|Hoy /i.test(section);
        const showAdAfterSection = i === 0 || i === 2;

        const html = markdownToHtml(section);

        const content = isDiscursoBlock && i > 0 ? (
          <div className="discurso-block group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={plainSection(section)} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        );

        return (
          <Fragment key={i}>
            {content}
            {showAdAfterSection && <AdSenseUnit />}
          </Fragment>
        );
      })}
    </div>
  );
}

function markdownToHtml(text: string): string {
  return marked.parse(text, { async: false }) as string;
}

function plainSection(section: string): string {
  return section.replace(/^##\s.*\n?/m, "").trim();
}
