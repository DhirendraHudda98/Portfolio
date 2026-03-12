export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden animate-pulse">
          <div className="h-48 bg-slate-800" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-slate-800 rounded w-3/4" />
            <div className="h-4 bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-800 rounded w-5/6" />
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-slate-800 rounded-full w-16" />
              <div className="h-6 bg-slate-800 rounded-full w-16" />
              <div className="h-6 bg-slate-800 rounded-full w-16" />
            </div>
            <div className="h-10 bg-slate-800 rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 space-y-4">
            <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto" />
            <div className="h-6 bg-slate-800 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-slate-800 rounded w-1/2 mx-auto" />
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-800 rounded w-full" />
              <div className="h-4 bg-slate-800 rounded w-3/4" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="h-8 bg-slate-800 rounded w-1/3" />
          <div className="h-4 bg-slate-800 rounded w-full" />
          <div className="h-4 bg-slate-800 rounded w-5/6" />
          <div className="h-4 bg-slate-800 rounded w-4/6" />
          <div className="h-8 bg-slate-800 rounded w-1/3 mt-8" />
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
            <div className="h-6 bg-slate-800 rounded w-1/4" />
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-2 bg-slate-800 rounded-full w-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse max-w-6xl mx-auto px-4 py-24 md:py-32 text-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-800 mx-auto mb-8" />
      <div className="h-12 bg-slate-800 rounded w-2/3 mx-auto mb-6" />
      <div className="h-6 bg-slate-800 rounded w-1/2 mx-auto mb-8" />
      <div className="flex gap-4 justify-center">
        <div className="h-12 bg-slate-800 rounded-lg w-36" />
        <div className="h-12 bg-slate-800 rounded-lg w-36" />
      </div>
    </div>
  )
}
