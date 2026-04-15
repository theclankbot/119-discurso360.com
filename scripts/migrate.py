"""
Migration script: XLSX → MDX
Reads discurso360.xlsx, filters URLs with >= 1 click from both CSVs,
and generates MDX files organized by category.
"""

import csv
import os
import re
import sys
from datetime import datetime

try:
    import openpyxl
except ImportError:
    print("Installing openpyxl...")
    os.system(f"{sys.executable} -m pip install openpyxl")
    import openpyxl

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
MIGRATION_DIR = os.path.join(PROJECT_DIR, "Migration")
CONTENT_DIR = os.path.join(PROJECT_DIR, "src", "content")

# Category mapping from WordPress categories to new slugs
CATEGORY_MAP = {
    "Amor": "bodas",
    "Boda": "bodas",
    "Familia": "familia",
    "Religión": "familia",
    "Quinceañera": "cumpleanos",
    "Cumpleaños": "cumpleanos",
    "Celebraciones": "cumpleanos",
    "Aniversario": "cumpleanos",
    "Graduación": "graduaciones",
    "Educación": "graduaciones",
    "Agradecimiento": "eventos",
    "Agradecimientos": "eventos",
    "Reconocimiento": "eventos",
    "Gratitud": "eventos",
    "Bienvenida": "eventos",
    "Empoderamiento": "oratoria",
    "Liderazgo": "oratoria",
    "Inspiración": "oratoria",
    "Innovación": "oratoria",
    "Creatividad": "oratoria",
    "Motivación": "oratoria",
    "Superación": "profesional",
    "Éxito": "profesional",
    "Emprendimiento": "profesional",
    "Trabajo": "profesional",
    "Jubilación": "profesional",
    "Desarrollo personal": "profesional",
    "Desarrollo Personal": "profesional",
    "Despedida": "despedidas",
    "Resiliencia": "despedidas",
    "Amistad": "despedidas",
    "Solidaridad": "despedidas",
    "Empatía": "despedidas",
    "Cambio": "despedidas",
    "Impacto": "oratoria",
    "Humor": "eventos",
    "Navidad": "familia",
    "Independencia": "oratoria",
    "Otros": "eventos",
}

# Default tones based on category
TONES_MAP = {
    "bodas": ["emotivo", "formal"],
    "cumpleanos": ["emotivo", "informal"],
    "graduaciones": ["formal", "emotivo"],
    "eventos": ["formal"],
    "profesional": ["formal", "profesional"],
    "familia": ["emotivo", "formal"],
    "oratoria": ["formal", "informativo"],
    "despedidas": ["emotivo"],
}


def slugify(text):
    """Convert text to URL slug."""
    text = text.lower().strip()
    text = re.sub(r"[áà]", "a", text)
    text = re.sub(r"[éè]", "e", text)
    text = re.sub(r"[íì]", "i", text)
    text = re.sub(r"[óò]", "o", text)
    text = re.sub(r"[úùü]", "u", text)
    text = re.sub(r"[ñ]", "n", text)
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")


def html_to_markdown(html):
    """Convert HTML content to clean markdown."""
    if not html:
        return ""

    text = html

    # Remove tabs and normalize whitespace
    text = text.replace("\t", "")

    # Headers
    text = re.sub(r"<h2[^>]*>(.*?)</h2>", r"\n## \1\n", text, flags=re.DOTALL)
    text = re.sub(r"<h3[^>]*>(.*?)</h3>", r"\n### \1\n", text, flags=re.DOTALL)
    text = re.sub(r"<h4[^>]*>(.*?)</h4>", r"\n#### \1\n", text, flags=re.DOTALL)

    # Bold and italic
    text = re.sub(r"<b>(.*?)</b>", r"**\1**", text, flags=re.DOTALL)
    text = re.sub(r"<strong>(.*?)</strong>", r"**\1**", text, flags=re.DOTALL)
    text = re.sub(r"<i>(.*?)</i>", r"*\1*", text, flags=re.DOTALL)
    text = re.sub(r"<em>(.*?)</em>", r"*\1*", text, flags=re.DOTALL)

    # Lists
    text = re.sub(r"<li>(.*?)</li>", r"- \1", text, flags=re.DOTALL)
    text = re.sub(r"</?[ou]l[^>]*>", "", text)

    # Blockquotes
    text = re.sub(r"<blockquote>(.*?)</blockquote>", r"> \1", text, flags=re.DOTALL)

    # Paragraphs and breaks
    text = re.sub(r"<p[^>]*>(.*?)</p>", r"\1\n\n", text, flags=re.DOTALL)
    text = re.sub(r"<br\s*/?>", "\n", text)

    # Remove remaining HTML tags
    text = re.sub(r"<[^>]+>", "", text)

    # Clean up whitespace
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = text.strip()

    return text


def get_urls_with_clicks():
    """Get set of URLs with >= 1 click from both CSVs."""
    urls = set()

    # Pàgines.csv
    pagines_path = os.path.join(MIGRATION_DIR, "Pàgines.csv")
    if os.path.exists(pagines_path):
        with open(pagines_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)  # skip header
            for row in reader:
                try:
                    clicks = int(row[1])
                    if clicks >= 1:
                        urls.add(row[0].strip().rstrip("/"))
                except (ValueError, IndexError):
                    continue

    # PageTrafficReport
    traffic_path = os.path.join(
        MIGRATION_DIR, "discurso360.com_PageTrafficReport_4_13_2026.csv"
    )
    if os.path.exists(traffic_path):
        with open(traffic_path, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader)  # skip header
            for row in reader:
                try:
                    clicks = int(row[2].strip('"'))
                    if clicks >= 1:
                        urls.add(row[0].strip('"').strip().rstrip("/"))
                except (ValueError, IndexError):
                    continue

    return urls


def extract_slug_from_url(url):
    """Extract the slug from a WordPress URL."""
    url = url.rstrip("/")
    parts = url.split("/")
    return parts[-1] if parts else ""


def main():
    # Get URLs with traffic
    urls_with_clicks = get_urls_with_clicks()
    print(f"Found {len(urls_with_clicks)} URLs with >= 1 click")

    # Build slug lookup from URLs
    slug_lookup = {}
    for url in urls_with_clicks:
        slug = extract_slug_from_url(url)
        if slug:
            slug_lookup[slug] = url

    # Read XLSX
    xlsx_path = os.path.join(MIGRATION_DIR, "discurso360.xlsx")
    wb = openpyxl.load_workbook(xlsx_path, read_only=True)
    ws = wb["Discurso360"]

    # Create content directories
    for cat_slug in set(CATEGORY_MAP.values()):
        os.makedirs(os.path.join(CONTENT_DIR, cat_slug), exist_ok=True)

    redirects = {}
    migrated = 0
    skipped = 0

    today = datetime.now().strftime("%Y-%m-%d")

    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i == 0:
            continue  # skip header

        kw = row[0] if row[0] else ""
        wp_category = row[1] if row[1] else "Otros"
        title = row[3] if row[3] else ""
        content_html = row[4] if row[4] else ""

        if not title or not content_html:
            continue

        # Generate slug from keyword
        article_slug = slugify(kw) if kw else slugify(title)
        if not article_slug:
            continue

        # Check if this article's slug matches any URL with clicks
        # Try exact match first, then partial
        matched_url = None
        if article_slug in slug_lookup:
            matched_url = slug_lookup[article_slug]
        else:
            # Try to find a URL that contains the slug
            for url_slug, url in slug_lookup.items():
                if article_slug == url_slug or url_slug == article_slug:
                    matched_url = url
                    break

        if matched_url is None:
            skipped += 1
            continue

        # Map category
        new_category = CATEGORY_MAP.get(wp_category, "eventos")

        # Convert content
        markdown_content = html_to_markdown(content_html)
        if not markdown_content:
            skipped += 1
            continue

        # Generate description from first paragraph
        first_para = markdown_content.split("\n\n")[0][:200].strip()
        if len(first_para) > 150:
            first_para = first_para[:150].rsplit(" ", 1)[0] + "..."

        # Extract tags from keyword
        tags = [t.strip() for t in kw.split() if len(t.strip()) > 3][:5]

        # Get tones
        tonos = TONES_MAP.get(new_category, ["formal"])

        # Build frontmatter
        old_url_path = matched_url.replace("https://discurso360.com", "")

        frontmatter = f"""---
title: "{title.replace('"', "'")}"
description: "{first_para.replace('"', "'")}"
category: {new_category}
tags: [{", ".join(f'"{t}"' for t in tags)}]
tonos: [{", ".join(f'"{t}"' for t in tonos)}]
oldUrls:
  - "{old_url_path}"
featured: false
publishedAt: "{today}"
updatedAt: "{today}"
---"""

        # Write MDX file
        mdx_content = f"{frontmatter}\n\n{markdown_content}\n"

        output_path = os.path.join(CONTENT_DIR, new_category, f"{article_slug}.mdx")

        # Avoid overwriting (some slugs might conflict)
        if os.path.exists(output_path):
            output_path = os.path.join(
                CONTENT_DIR, new_category, f"{article_slug}-2.mdx"
            )

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(mdx_content)

        # Track redirect
        redirects[old_url_path] = f"/{new_category}/{article_slug}"
        migrated += 1

    # Write redirects JSON
    redirects_path = os.path.join(PROJECT_DIR, "src", "data", "redirects.json")
    import json

    with open(redirects_path, "w", encoding="utf-8") as f:
        json.dump(redirects, f, indent=2, ensure_ascii=False)

    print(f"\nMigration complete:")
    print(f"  Migrated: {migrated} articles")
    print(f"  Skipped:  {skipped} articles (no matching URL with clicks)")
    print(f"  Redirects: {len(redirects)} entries saved to src/data/redirects.json")

    # Print category distribution
    cat_counts = {}
    for cat_slug in set(CATEGORY_MAP.values()):
        cat_path = os.path.join(CONTENT_DIR, cat_slug)
        if os.path.exists(cat_path):
            count = len([f for f in os.listdir(cat_path) if f.endswith(".mdx")])
            if count > 0:
                cat_counts[cat_slug] = count

    print("\nCategory distribution:")
    for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")


if __name__ == "__main__":
    main()
