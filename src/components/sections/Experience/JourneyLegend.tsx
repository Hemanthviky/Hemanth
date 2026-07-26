/** Past / Current / On-the-way key, mirroring the waypoint marker states on
 * the road below. */
export function JourneyLegend() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
      <span className="flex items-center gap-2 text-[0.75rem] font-semibold text-black/45">
        <span className="h-2.5 w-2.5 rounded-full bg-black/25" />
        Past Journey
      </span>

      <span className="flex items-center gap-2 text-[0.75rem] font-semibold text-black/45">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-50 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
        </span>
        Current Role
      </span>

      <span className="flex items-center gap-2 text-[0.75rem] font-semibold text-black/45">
        <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-black/35" />
        On The Way
      </span>
    </div>
  );
}
