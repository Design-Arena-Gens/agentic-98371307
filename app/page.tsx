'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { Manuscript, ManuscriptInputs } from '@/lib/types';

type FormState = ManuscriptInputs;

const initialState: FormState = {
  workingTitle: 'The 30-Minute Creator Sprint',
  coreIdea: 'building a daily creative routine that ships ideas',
  audience: 'solopreneur creators',
  tone: 'energizing and practical',
  targetPages: 24
};

const headingMotion = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export default function HomePage() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manuscript, setManuscript] = useState<Manuscript | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === 'targetPages' ? Number(value) : value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setManuscript(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        const payload = await response.json();
        throw new Error(payload.error ?? 'Failed to generate manuscript');
      }

      const payload = (await response.json()) as Manuscript;
      setManuscript(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const heroCopy = useMemo(
    () => [
      `Blueprint an Amazon Kindle-ready manuscript in minutes.`,
      `This autonomous agent analyses your book concept, splits it into ${formState.targetPages} refined pages, and returns a launch-ready draft.`,
      'It weaves publishing specs, marketing hooks, and chapter-level actions so you can move straight to editing.'
    ],
    [formState.targetPages]
  );

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/40 p-10 shadow-xl backdrop-blur">
        <motion.header
          initial={headingMotion.hidden}
          animate={headingMotion.visible}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <span className="text-sm uppercase tracking-[0.4em] text-emerald-400">Agentic Publishing Studio</span>
          <h1 className="font-display text-4xl font-semibold leading-tight text-sky-100 sm:text-5xl">
            Kindle Short-Read Builder
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Feed the agent your concept, and receive a structured 10–30 page manuscript with Kindle formatting specs,
            chapter pacing, and marketing copy.
          </p>
          <ul className="flex flex-wrap gap-3 text-sm text-slate-400">
            {heroCopy.map((line) => (
              <li key={line} className="rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1">
                {line}
              </li>
            ))}
          </ul>
        </motion.header>
      </section>

      <section className="grid items-start gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <form
          onSubmit={handleSubmit}
          className="sticky top-8 flex max-h-[calc(100vh-6rem)] flex-col gap-6 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg backdrop-blur"
        >
          <fieldset className="flex flex-col gap-3">
            <label htmlFor="workingTitle" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Working Title
            </label>
            <input
              id="workingTitle"
              name="workingTitle"
              value={formState.workingTitle}
              onChange={handleChange}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              placeholder="Enter a working title"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <label htmlFor="coreIdea" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Core Idea
            </label>
            <textarea
              id="coreIdea"
              name="coreIdea"
              value={formState.coreIdea}
              onChange={handleChange}
              className="h-28 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              placeholder="Describe the central transformation or topic"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <label htmlFor="audience" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Primary Audience
            </label>
            <input
              id="audience"
              name="audience"
              value={formState.audience}
              onChange={handleChange}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              placeholder="Who is this book for?"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <label htmlFor="tone" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Desired Tone
            </label>
            <input
              id="tone"
              name="tone"
              value={formState.tone}
              onChange={handleChange}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              placeholder="e.g. reflective, bold, playful"
              required
            />
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <label htmlFor="targetPages" className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Target Page Count (10–30)
            </label>
            <input
              id="targetPages"
              name="targetPages"
              type="number"
              min={10}
              max={30}
              value={formState.targetPages}
              onChange={handleChange}
              className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-slate-100 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-400/30"
              required
            />
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gradient-to-r from-sky-400 to-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:from-sky-300 hover:to-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Generating Manuscript…' : 'Generate Kindle Manuscript'}
          </button>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          {!loading && !error && !manuscript ? (
            <p className="text-xs text-slate-500">
              Need inspiration? Try adjusting the page count or audience to explore different blueprints.
            </p>
          ) : null}
        </form>

        <div className="flex min-h-[420px] flex-col gap-6">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid h-full place-items-center rounded-3xl border border-slate-800 bg-slate-900/30 p-10 text-slate-400"
              >
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-sky-400" />
                  <p className="text-lg font-medium">Drafting your chapter scaffolding…</p>
                  <p className="text-sm text-slate-500">
                    Mapping blueprint → chapter arcs → page-by-page actions → marketing assets.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {manuscript ? (
            <motion.article
              key={manuscript.inputs.workingTitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 shadow-lg backdrop-blur"
            >
              <header className="flex flex-col gap-2">
                <h2 className="font-display text-2xl font-semibold text-sky-100">
                  {manuscript.inputs.workingTitle}
                </h2>
                <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
                  {manuscript.inputs.targetPages} Kindle pages • {manuscript.inputs.tone}
                </p>
                <p className="text-slate-300">
                  Promise: <span className="text-sky-300">{manuscript.blueprint.promise}</span>
                </p>
                <p className="text-slate-400">
                  Outcome: <span className="text-emerald-300">{manuscript.blueprint.measurableOutcome}</span>
                </p>
              </header>

              <section className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Blueprint Inputs
                </h3>
                <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div>
                    <p className="text-slate-500">Audience</p>
                    <p>{manuscript.inputs.audience}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Tone Palette</p>
                    <p>{manuscript.blueprint.tonalPalette.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Anchor Stories</p>
                    <p>{manuscript.blueprint.anchorStories.join(' • ')}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Research Buckets</p>
                    <p>{manuscript.blueprint.researchBuckets.join(' • ')}</p>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <header className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Chapter Architecture
                  </h3>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                    {manuscript.chapters.length} chapters
                  </span>
                </header>
                <div className="flex flex-col divide-y divide-slate-800">
                  {manuscript.chapters.map((chapter) => (
                    <div key={chapter.id} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-medium text-sky-200">{chapter.title}</p>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        {chapter.pageEstimate} pages • Focus: {chapter.focus}
                      </p>
                      <ul className="mt-3 space-y-1 text-sm text-slate-300">
                        {chapter.keyQuestions.map((question) => (
                          <li key={question} className="flex gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            <span>{question}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <header className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Page-by-Page Draft
                  </h3>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    Kindle short read ready
                  </span>
                </header>
                <div className="grid gap-4 lg:grid-cols-2">
                  {manuscript.pages.map((page) => (
                    <motion.div
                      key={page.pageNumber}
                      layout
                      className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 shadow-sm"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        Page {page.pageNumber} · {page.chapterTitle}
                      </p>
                      <p className="mt-1 font-semibold text-slate-200">{page.heading}</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-300">
                        {page.content.map((paragraph) => (
                          <li key={paragraph} className="rounded-lg bg-slate-950/60 p-3 text-left">
                            {paragraph}
                          </li>
                        ))}
                      </ul>
                      {page.callToAction ? (
                        <p className="mt-3 text-xs text-emerald-300">Agent CTA: {page.callToAction}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Publishing Guidance
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <span className="text-slate-500">Trim Size:</span> {manuscript.guidance.trimSize}
                    </p>
                    <p>
                      <span className="text-slate-500">Interior:</span> {manuscript.guidance.interior}
                    </p>
                    <p>
                      <span className="text-slate-500">Font:</span> {manuscript.guidance.font}
                    </p>
                    <p>
                      <span className="text-slate-500">Margins:</span> {manuscript.guidance.margins}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p className="text-slate-500">Front Matter Checklist</p>
                    <ul className="space-y-1">
                      {manuscript.guidance.frontMatter.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                    <p className="mt-3 text-slate-500">Back Matter Checklist</p>
                    <ul className="space-y-1">
                      {manuscript.guidance.backMatter.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Marketing Launch Kit
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="text-sm text-slate-300">
                    <p className="text-slate-500">Subtitle</p>
                    <p>{manuscript.marketing.subtitle}</p>
                    <p className="mt-3 text-slate-500">Elevator Pitch</p>
                    <p>{manuscript.marketing.elevatorPitch}</p>
                  </div>
                  <div className="text-sm text-slate-300">
                    <p className="text-slate-500">Keywords</p>
                    <p>{manuscript.marketing.keywords.join(', ')}</p>
                    <p className="mt-3 text-slate-500">KDP Categories</p>
                    <p>{manuscript.marketing.categories.join(' | ')}</p>
                    <p className="mt-3 text-slate-500">Author Persona Guidance</p>
                    <p>{manuscript.marketing.authorPersona}</p>
                  </div>
                </div>
              </section>
            </motion.article>
          ) : null}
        </div>
      </section>
    </div>
  );
}
