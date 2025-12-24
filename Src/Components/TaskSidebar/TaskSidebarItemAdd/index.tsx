import { useModal } from '../../Modal/hooks/UseModal'
import { useTasks } from '../Hooks/UseTasks'
import { Modal } from '../../Modal'

import './style.sass'

export function AddTask() {
  const { addTask } = useTasks()
  const { isOpen, toggle, close } = useModal()

  return (
    <div className='new-task-container flex'>
      <div className='new-task-icon'>
        <svg
          class='w-6 h-6 text-on-surface-container'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M5 12h14m-7 7V5'
          />
        </svg>
      </div>
      <div className='new-label ml-3' onClick={() => toggle()}>
        <h2>Добавить новое сканирование</h2>
      </div>

      <Modal isOpen={isOpen} onClose={() => close()} title='Новое сканирование'>
        <h1>Новое сканирование</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In totam veritatis perspiciatis
          expedita adipisci. Quia fugiat earum aliquam magni qui porro obcaecati dolores, similique
          odio, aperiam nulla velit, quis quas. Laborum obcaecati blanditiis quaerat quasi! Enim
          repellat sed possimus totam, quibusdam cum asperiores ducimus quod illo dicta modi
          molestias aperiam quos ex soluta ab exercitationem sint impedit iure maiores. Maxime
          laborum odit at debitis quo, repellendus iste eaque sint asperiores, obcaecati enim neque
          qui eligendi vero totam similique numquam. Animi vitae cupiditate fugit et voluptas
          perferendis? Sit reiciendis perferendis repellat ex quos perspiciatis ratione tempore quae
          impedit iusto deleniti veniam totam nulla quia ab placeat, officiis earum quo
          exercitationem, illum qui rem ut. Neque voluptas numquam sed sunt tempore sequi nobis
          explicabo rerum possimus quidem perspiciatis obcaecati quaerat ab illum ex corporis, eos
          repudiandae deleniti adipisci inventore ullam cumque esse nisi laboriosam? Sit, labore.
          Cum est aliquid animi, nesciunt tempore atque natus quidem accusamus odio perferendis
          molestias. Ipsum odio eaque provident molestiae aspernatur earum aliquid est atque
          doloribus, voluptatum distinctio adipisci eius, pariatur sunt facilis, quasi dolore harum
          voluptatem eligendi tempore architecto? Ipsa quod blanditiis ea, error officia odit velit
          tempore architecto sequi nesciunt deserunt sint, nostrum veniam dolore, maiores amet! Ex
          ipsum, sit fuga possimus corporis nulla sint vero dolor, quae assumenda inventore.
          Perferendis, sit aut? Natus impedit perspiciatis nesciunt dolores tempora quia voluptates
          velit pariatur voluptas corrupti quod sint unde, distinctio repellendus minus culpa
          dignissimos ut laboriosam? Voluptates sit rerum aliquid soluta! Accusantium, architecto?
          Illum, sint dignissimos? Sunt sequi placeat accusantium vero iure voluptatum incidunt
          vitae impedit odio illum. Rem consectetur odio deleniti inventore, aspernatur soluta eius
          fugiat. Laudantium rem reiciendis accusantium tempora neque beatae id molestias eligendi?
          A quisquam similique omnis labore, cumque fugiat deserunt blanditiis laborum nisi
          accusamus repudiandae rerum mollitia quos! Vel asperiores ea sit.
        </p>
      </Modal>
    </div>
  )
}
