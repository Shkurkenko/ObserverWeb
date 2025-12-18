interface SkeletonTableBodyProps {
  rows?: number
  columns?: number
  rowHeight?: number
}

export const SkeletonTableBody = ({
  rows = 10,
  columns = 6,
  rowHeight = 60,
}: SkeletonTableBodyProps) => (
  <>
    {[...Array(rows)].map((_, i) => (
      <div
        key={i}
        className='observer-table-body-row w-full flex items-center px-6 border-b border-outline-variant'
        style={{ height: rowHeight }}
      >
        <div className='w-full flex gap-6'>
          {[...Array(columns)].map((_, c) => (
            <div
              key={c}
              className='h-4 bg-surface-container-high rounded animate-pulse'
              style={{
                width: c === 0 ? '40px' : `${50 + Math.random() * 40}%`,
                animationDelay: `${c * 80 + i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>
    ))}
  </>
)
