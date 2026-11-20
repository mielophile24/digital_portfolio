import React, { useState, useEffect, useMemo } from 'react';
import Section from './common/Section';
import Heading from './common/Heading';

const USERNAME = 'mielophile24';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`;

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const LEVEL_COLORS = {
  0: 'bg-white/[0.04] border border-white/[0.05]',
  1: 'bg-[#5c3826] border border-[#6b422d]',
  2: 'bg-[#8d5735] border border-[#9e633d]',
  3: 'bg-[#be7744] border border-[#ce864f]',
  4: 'bg-[#e2a365] border border-[#ebb178] shadow-sm shadow-oak/20'
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
        // Today has 0 so far, check if yesterday had streak
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
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Section id="contributions">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <Heading sub="Year-round commit activity and open source contributions.">
            GitHub Contributions
          </Heading>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coal border border-white/10 hover:border-oak text-sm font-semibold text-sand hover:text-oak transition-colors self-start md:self-auto mb-10 sm:mb-14"
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

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="lift p-4 sm:p-5 rounded-2xl bg-coal border border-white/5">
          <p className="text-xs sm:text-sm text-mute">Total Contributions</p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-sand mt-1">
            {loading ? '...' : (stats.total || 0).toLocaleString()}
          </p>
          <p className="text-xs text-mute/80 mt-1">In the last 12 months</p>
        </div>
        <div className="lift p-4 sm:p-5 rounded-2xl bg-coal border border-white/5">
          <p className="text-xs sm:text-sm text-mute">Longest Streak</p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-oak mt-1">
            {loading ? '...' : `${stats.longestStreak} days`}
          </p>
          <p className="text-xs text-mute/80 mt-1">Consistent activity</p>
        </div>
        <div className="lift col-span-2 sm:col-span-1 p-4 sm:p-5 rounded-2xl bg-coal border border-white/5">
          <p className="text-xs sm:text-sm text-mute">Current Streak</p>
          <p className="text-2xl sm:text-3xl font-display font-bold text-sand mt-1">
            {loading ? '...' : `${stats.currentStreak} ${stats.currentStreak === 1 ? 'day' : 'days'}`}
          </p>
          <p className="text-xs text-mute/80 mt-1">Recent contributions</p>
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="lift rounded-2xl bg-coal border border-white/5 p-5 sm:p-7 relative overflow-hidden">
        {loading && (
          <div className="py-14 text-center">
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
            {/* Scrollable grid container */}
            <div className="overflow-x-auto pb-3 pt-1 scrollbar-thin">
              <div className="inline-block min-w-[760px] select-none">
                {/* Month labels */}
                <div className="flex text-xs text-mute mb-2 h-4 relative pl-8">
                  {monthLabels.map((m, idx) => (
                    <span
                      key={idx}
                      className="absolute"
                      style={{ left: `calc(2rem + ${m.index * 14}px)` }}
                    >
                      {m.name}
                    </span>
                  ))}
                </div>

                {/* Calendar Days Matrix */}
                <div className="flex gap-[3px]">
                  {/* Day of week labels */}
                  <div className="flex flex-col gap-[3px] pr-2 text-[10px] text-mute w-8 justify-between h-[96px] py-[1px]">
                    {DAY_LABELS.map((day, idx) => (
                      <span key={idx} className="h-[10.5px] leading-[10.5px]">
                        {day}
                      </span>
                    ))}
                  </div>

                  {/* Weeks columns */}
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[3px]">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={dIdx}
                              className="w-[11px] h-[11px] rounded-[2px] opacity-0"
                            />
                          );
                        }

                        const levelClass = LEVEL_COLORS[day.level] || LEVEL_COLORS[0];

                        return (
                          <div
                            key={dIdx}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[11px] h-[11px] rounded-[2px] ${levelClass} transition-transform hover:scale-125 cursor-pointer relative`}
                            aria-label={`${day.count} contributions on ${day.date}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar with Hover Details & Legend */}
            <div className="mt-5 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-mute">
              <div className="min-h-[1.25rem] text-sand/90">
                {hoveredDay ? (
                  <span>
                    <strong className="text-oak">{hoveredDay.count}</strong> contribution{hoveredDay.count !== 1 ? 's' : ''} on{' '}
                    <span className="text-sand">{formatDate(hoveredDay.date)}</span>
                  </span>
                ) : (
                  <span className="text-mute">Hover over any square to view details</span>
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <span className="text-[11px] mr-1">Less</span>
                <span className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[0]}`} />
                <span className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[1]}`} />
                <span className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[2]}`} />
                <span className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[3]}`} />
                <span className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[4]}`} />
                <span className="text-[11px] ml-1">More</span>
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}
