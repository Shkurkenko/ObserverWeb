interface SkeletonTableHeaderProps {
  columns?: number
  rowHeight?: number
}

export const SkeletonTableHeader = ({ columns = 6, rowHeight = 60 }: SkeletonTableHeaderProps) => (
  <>
    <div
      className={`w-full absolute inset-0 pointer-events-none bg-surface-container flex items-center justify-center pl-7 gap-6 h-[${rowHeight}px]`}
    >
      {[...Array(columns)].map((_, i) => (
        <div
          key={i}
          className='h-4 bg-surface-container-high rounded animate-pulse'
          style={{
            width: i === 0 ? '40px' : `${50 + Math.random() * 40}%`,
            animationDelay: `${i * 80 + i * 40}ms`,
          }}
        />
      ))}
    </div>
  </>
)
