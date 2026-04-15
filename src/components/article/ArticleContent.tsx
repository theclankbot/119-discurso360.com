"use client";

import { marked } from "marked";
import { CopyButton } from "./CopyButton";

marked.setOptions({
  breaks: true,
  gfm: true,
});

export function ArticleContent({ content }: { content: string }) {
  const sections = content.split(/(?=^##\s)/gm).filter(Boolean);

  return (
    <div className="prose-editorial">
      {sections.map((section, i) => {
        const sectionTitle = section.match(/^##\s+(.+)$/m)?.[1] ?? "";
        const isDiscursoBlock =
          /ejemplo|modelo|discurso/i.test(sectionTitle) ||
          /Queridos|Buenas|Estimados|Hoy /i.test(section);

        const html = markdownToHtml(section);

        if (isDiscursoBlock && i > 0) {
          return (
            <div key={i} className="discurso-block group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={plainSection(section)} />
              </div>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
          );
        }

        return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
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
