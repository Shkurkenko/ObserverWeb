export const EmptyReoView = () => {
  return (
    <div className='h-full flex flex-col items-center justify-center p-8'>
      <div className='text-center max-w-lg'>
        <div className='text-8xl mb-6 opacity-20'>📡</div>
        <h2 className='text-3xl font-bold text-on-surface mb-4'>Сканер радиоэфира</h2>
        <p className='text-lg text-on-surface-variant mb-8'>
          Выберите задачу сканирования из списка слева или создайте новую для начала работы
        </p>
        <div className='grid grid-cols-2 gap-4 text-sm text-on-surface-variant'>
          <div className='text-center p-4 bg-surface-container rounded-lg'>
            <div className='text-2xl mb-2'>📶</div>
            <div>GSM/LTE/5G сети</div>
          </div>
          <div className='text-center p-4 bg-surface-container rounded-lg'>
            <div className='text-2xl mb-2'>📡</div>
            <div>Wi-Fi сети</div>
          </div>
          <div className='text-center p-4 bg-surface-container rounded-lg'>
            <div className='text-2xl mb-2'>🔵</div>
            <div>Bluetooth</div>
          </div>
          <div className='text-center p-4 bg-surface-container rounded-lg'>
            <div className='text-2xl mb-2'>📊</div>
            <div>Анализ в реальном времени</div>
          </div>
        </div>
      </div>
    </div>
  )
}
