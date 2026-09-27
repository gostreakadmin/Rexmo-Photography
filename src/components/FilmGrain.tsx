import type { FC } from 'react';

export const FilmGrain: FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99] opacity-[0.035] mix-blend-overlay film-grain select-none"
      aria-hidden="true"
    />
  );
};
