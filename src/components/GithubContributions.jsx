import React, { useState, useEffect, useMemo } from 'react';
import Section from './common/Section';
import Heading from './common/Heading';

const USERNAME = 'mielophile24';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LEVEL_COLORS = {
  0: 'bg-white/[0.04] border border-white/[0.05]',
  1: 'bg-[#5c3826] border border-[#72452e]',
  2: 'bg-[#8d5735] border border-[#a3653e]',
  3: 'bg-[#be7744] border border-[#d2854e]',
  4: 'bg-[#e2a365] border border-[#f0b57e] shadow-sm shadow-oak/25'
};

export default function GithubContributions() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hoveredDay, setHoveredDay] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute stats and calendar matrix
  const { weeks, monthLabels, stats } = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], stats: { total: 0, currentStreak: 0, longestStreak: 0 } };
    }

    const contributions = data.contributions;
    const weeksArr = [];
    let currentWeek = [];

    // Fill initial empty days in first week
    const firstDate = new Date(contributions[0].date + 'T00:00:00');
    const startDay = firstDate.getDay(); // 0 is Sunday
    for (let i = 0; i < startDay; i++) {
      currentWeek.push(null);
    }

    // Build weeks
    contributions.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    // Calculate month label positions
    const mLabels = [];
    let lastMonth = -1;
    weeksArr.forEach((week, weekIdx) => {
      const validDay = week.find((d) => d !== null);
      if (validDay) {
        const d = new Date(validDay.date + 'T00:00:00');
        const m = d.getMonth();
        if (m !== lastMonth && d.getDate() <= 14) {
          mLabels.push({ index: weekIdx, name: MONTH_NAMES[m] });
          lastMonth = m;
        }
      }
    });

    // Streaks calculation
    let total = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let tempStreak = 0;

    contributions.forEach((item) => {
      total += item.count;
      if (item.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    });

    // Current streak from the end
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        currentStreak++;
      } else if (i === contributions.length - 1) {
        continue;
      } else {
        break;
      }
    }

    return {
      weeks: weeksArr,
      monthLabels: mLabels,
      stats: {
        total: data.total?.lastYear ?? total,
        currentStreak,
        longestStreak
      }
    };
  }, [data]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Section id="contributions">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <Heading sub="Year-round commit history and open source contributions.">
          GitHub Contributions
        </Heading>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coal border border-white/10 hover:border-oak text-sm font-semibold text-sand hover:text-oak transition-colors self-start sm:self-auto mb-10 sm:mb-14"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          <span>@{USERNAME}</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>

      {/* Maximized Full-Width Calendar Card */}
      <div className="lift rounded-2xl bg-coal border border-white/5 p-5 sm:p-7 md:p-8 relative overflow-hidden">
        {/* Top Header Row Inside Card: Key Metrics & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/5">
          <div className="flex flex-wrap items-center gap-5 sm:gap-8">
            <div>
              <p className="text-xs text-mute font-medium">Total Contributions</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-sand mt-0.5">
                {loading ? '...' : (stats.total || 0).toLocaleString()}
              </p>
              <p className="text-[11px] text-mute/80 mt-0.5">Past 12 months</p>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-xs text-mute font-medium">Longest Streak</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-oak mt-0.5">
                {loading ? '...' : `${stats.longestStreak} days`}
              </p>
              <p className="text-[11px] text-mute/80 mt-0.5">Best record</p>
            </div>
            <div className="h-10 w-px bg-white/10 hidden sm:block" />
            <div>
              <p className="text-xs text-mute font-medium">Current Streak</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-sand mt-0.5">
                {loading ? '...' : `${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}`}
              </p>
              <p className="text-[11px] text-mute/80 mt-0.5">Active streak</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/5 text-xs text-mute">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>GitHub Live Sync</span>
          </div>
        </div>

        {loading && (
          <div className="py-16 text-center">
            <div className="inline-block w-8 h-8 border-2 border-oak/30 border-t-oak rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-mute">Loading contributions from GitHub...</p>
          </div>
        )}

        {error && (
          <div className="py-8 text-center flex flex-col items-center">
            <p className="text-sm text-mute mb-4">Could not load live grid. Viewing chart directly:</p>
            <img
              src={`https://ghchart.rshah.org/d9995a/${USERNAME}`}
              alt={`${USERNAME}'s GitHub Contributions Chart`}
              className="max-w-full rounded-lg bg-black/40 p-3 border border-white/10"
            />
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Scrollable on small screens, expands to 100% full card width on tablet/desktop */}
            <div className="overflow-x-auto pb-2 scrollbar-thin">
              <div className="min-w-[720px] w-full select-none">
                <div className="flex w-full items-start gap-2">
                  {/* Day-of-week labels */}
                  <div className="w-6 shrink-0 pt-6 flex flex-col justify-between text-[10px] text-mute font-mono select-none h-[105px] sm:h-[118px] md:h-[132px] py-1">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Weeks and Months container taking full available space */}
                  <div className="flex-1 w-full min-w-0">
                    {/* Month labels positioned across 100% of the columns */}
                    <div className="relative h-5 w-full text-[11px] text-mute mb-1.5 select-none">
                      {monthLabels.map((m, idx) => (
                        <span
                          key={idx}
                          className="absolute -translate-x-1"
                          style={{ left: `${(m.index / weeks.length) * 100}%` }}
                        >
                          {m.name}
                        </span>
                      ))}
                    </div>

                    {/* Columns of weeks expanding across full width */}
                    <div className="flex w-full justify-between gap-[2.5px] sm:gap-[3.5px] md:gap-[4.5px]">
                      {weeks.map((week, wIdx) => (
                        <div
                          key={wIdx}
                          className="flex-1 flex flex-col gap-[2.5px] sm:gap-[3.5px] md:gap-[4.5px] min-w-[8px]"
                        >
                          {week.map((day, dIdx) => {
                            if (!day) {
                              return (
                                <div
                                  key={dIdx}
                                  className="w-full aspect-square opacity-0 pointer-events-none"
                                />
                              );
                            }

                            const levelClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];

                            return (
                              <div
                                key={dIdx}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                                className={`w-full aspect-square rounded-[2px] sm:rounded-[3px] ${levelClass} transition-all duration-150 hover:scale-150 hover:z-20 cursor-pointer`}
                                aria-label={`${day.count} contributions on ${day.date}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Detail readout and Color Scale Legend */}
            <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mute">
              <div className="min-h-[1.5rem] flex items-center text-sand/90">
                {hoveredDay ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-oak" />
                    <span>
                      <strong className="text-oak font-semibold">{hoveredDay.count}</strong> contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
                      <span className="text-sand font-medium">{formatDate(hoveredDay.date)}</span>
                    </span>
                  </span>
                ) : (
                  <span className="text-mute/80">Hover over any day square to view details</span>
                )}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <span className="text-[11px] text-mute mr-1">Less</span>
                <span className={`w-3 h-3 rounded-[2px] ${LEVEL_COLORS[0]}`} />
                <span className={`w-3 h-3 rounded-[2px] ${LEVEL_COLORS[1]}`} />
                <span className={`w-3 h-3 rounded-[2px] ${LEVEL_COLORS[2]}`} />
                <span className={`w-3 h-3 rounded-[2px] ${LEVEL_COLORS[3]}`} />
                <span className={`w-3 h-3 rounded-[2px] ${LEVEL_COLORS[4]}`} />
                <span className="text-[11px] text-mute ml-1">More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
