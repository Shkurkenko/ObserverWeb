// import { Container, ContainerLayouts } from '../../Src/Components/Layouts/Box'
// import { Section } from '../../Src/Components/Layouts/Section/Section'
// import GridLayout
// import { Text } from '../../Src/Components/Typography'
// import { Heading } from '../../Src/Components/Typography'

// export const LayoutsExample = () => {
//   return (
//     <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
//       {/* Section with wide content */}
//       <Section
//         title='Welcome to layout tester page!'
//         description='This is example and test of using different layouts and containers components for UI components library'
//         background='primary'
//         rounded='none'
//         paddingY='xl'
//       >
//         <Container size='lg' align='center' className='text-center'>
//           <Heading level={1} className='mb-4'>
//             Heading in container!
//           </Heading>
//           <Text variant='body1' className='max-w-2xl mx-auto'>
//             Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora necessitatibus,
//             voluptas omnis animi cupiditate distinctio non ab veniam dolore, asperiores molestiae?
//             Eveniet error odit alias!
//           </Text>
//         </Container>
//       </Section>

//       {/* Sections with main content */}
//       <ContainerLayouts.Content>
//         <GridContainer columns={3} gap='lg'>
//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <ContainerLayouts.Card
//               key={item}
//               paddingY='lg'
//               paddingX='md'
//               className='hover:shadow-lg transition-shadow'
//             >
//               <Heading level={3}>Card {item}</Heading>
//               <Text variant='body2' className='mt-2'>
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit. A laborum deleniti quia
//                 iure magnam doloribus excepturi cum repellendus minus error, labore repellat maxime
//                 distinctio earum. Ad, eaque! Incidunt, alias beatae?
//               </Text>
//             </ContainerLayouts.Card>
//           ))}
//         </GridContainer>
//       </ContainerLayouts.Content>

//       {/* Thin container for form */}
//       <ContainerLayouts.Content paddingY='lg'>
//         <ContainerLayouts.Wide>
//           <Section
//             title='Наша команда'
//             titleVariant='h3'
//             background='white'
//             rounded='lg'
//             shadow='md'
//             paddingY='lg'
//           >
//             <div className='space-y-8'>
//               <div className='text-center mb-8'>
//                 <p className='text-gray-600'>
//                   Мы — команда профессионалов, готовых помочь вам с любыми вопросами
//                 </p>
//               </div>

//               <div className='grid gap-6 sm:grid-cols-2'>
//                 {[
//                   {
//                     name: 'Анна Иванова',
//                     role: 'Менеджер по работе с клиентами',
//                     email: 'anna@example.com',
//                     phone: '+7 (495) 111-22-33',
//                     photoColor: 'bg-pink-100',
//                   },
//                   {
//                     name: 'Петр Смирнов',
//                     role: 'Технический директор',
//                     email: 'petr@example.com',
//                     phone: '+7 (495) 222-33-44',
//                     photoColor: 'bg-blue-100',
//                   },
//                   {
//                     name: 'Мария Петрова',
//                     role: 'Маркетолог',
//                     email: 'maria@example.com',
//                     phone: '+7 (495) 333-44-55',
//                     photoColor: 'bg-purple-100',
//                   },
//                   {
//                     name: 'Иван Сидоров',
//                     role: 'Разработчик',
//                     email: 'ivan@example.com',
//                     phone: '+7 (495) 444-55-66',
//                     photoColor: 'bg-green-100',
//                   },
//                 ].map((person, index) => (
//                   <div
//                     key={index}
//                     className='bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors'
//                   >
//                     <div className='flex items-center space-x-4'>
//                       <div
//                         className={`${person.photoColor} w-16 h-16 rounded-full flex items-center justify-center`}
//                       >
//                         <span className='text-2xl font-semibold text-gray-700'>
//                           {person.name
//                             .split(' ')
//                             .map((n) => n[0])
//                             .join('')}
//                         </span>
//                       </div>
//                       <div className='flex-1'>
//                         <h4 className='font-semibold text-gray-900'>{person.name}</h4>
//                         <p className='text-sm text-gray-600'>{person.role}</p>
//                       </div>
//                     </div>

//                     <div className='mt-4 space-y-2'>
//                       <div className='flex items-center text-sm text-gray-600'>
//                         <svg
//                           className='w-4 h-4 mr-2 text-gray-400'
//                           fill='currentColor'
//                           viewBox='0 0 20 20'
//                         >
//                           <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
//                           <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
//                         </svg>
//                         <a href={`mailto:${person.email}`} className='hover:text-blue-600'>
//                           {person.email}
//                         </a>
//                       </div>
//                       <div className='flex items-center text-sm text-gray-600'>
//                         <svg
//                           className='w-4 h-4 mr-2 text-gray-400'
//                           fill='currentColor'
//                           viewBox='0 0 20 20'
//                         >
//                           <path
//                             fillRule='evenodd'
//                             d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z'
//                             clipRule='evenodd'
//                           />
//                         </svg>
//                         <a href={`tel:${person.phone}`} className='hover:text-blue-600'>
//                           {person.phone}
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Section>
//         </ContainerLayouts.Wide>
//       </ContainerLayouts.Content>

//       <ContainerLayouts.Content paddingY='lg'>
//         <ContainerLayouts.Narrow>
//           <Section
//             title='Контактная информация'
//             titleVariant='h3'
//             background='white'
//             rounded='lg'
//             shadow='md'
//             paddingY='lg'
//           >
//             <div className='space-y-8'>
//               {/* Статистика */}
//               <div className='grid grid-cols-2 gap-4 text-center'>
//                 <div className='bg-blue-50 rounded-lg p-4'>
//                   <div className='text-2xl font-bold text-blue-600'>24/7</div>
//                   <div className='text-sm text-gray-600 mt-1'>Поддержка</div>
//                 </div>
//                 <div className='bg-green-50 rounded-lg p-4'>
//                   <div className='text-2xl font-bold text-green-600'>30 мин</div>
//                   <div className='text-sm text-gray-600 mt-1'>Среднее время ответа</div>
//                 </div>
//                 <div className='bg-purple-50 rounded-lg p-4'>
//                   <div className='text-2xl font-bold text-purple-600'>95%</div>
//                   <div className='text-sm text-gray-600 mt-1'>Удовлетворенность клиентов</div>
//                 </div>
//                 <div className='bg-yellow-50 rounded-lg p-4'>
//                   <div className='text-2xl font-bold text-yellow-600'>10к+</div>
//                   <div className='text-sm text-gray-600 mt-1'>Решенных вопросов</div>
//                 </div>
//               </div>

//               {/* Социальные сети */}
//               <div>
//                 <h4 className='font-semibold text-gray-900 mb-4'>Мы в социальных сетях</h4>
//                 <div className='flex flex-wrap gap-3'>
//                   {[
//                     { name: 'Telegram', color: 'bg-blue-500', icon: 'Tg' },
//                     { name: 'WhatsApp', color: 'bg-green-500', icon: 'WA' },
//                     { name: 'VK', color: 'bg-blue-600', icon: 'VK' },
//                     { name: 'YouTube', color: 'bg-red-600', icon: 'YT' },
//                     { name: 'Twitter', color: 'bg-sky-500', icon: 'Tw' },
//                     { name: 'GitHub', color: 'bg-gray-800', icon: 'GH' },
//                   ].map((social, index) => (
//                     <a
//                       key={index}
//                       href='#'
//                       className={`${social.color} text-white rounded-lg px-4 py-3 flex items-center space-x-2 hover:opacity-90 transition-opacity`}
//                     >
//                       <span className='font-medium'>{social.icon}</span>
//                       <span className='text-sm'>{social.name}</span>
//                     </a>
//                   ))}
//                 </div>
//               </div>

//               {/* Простой CTA */}
//               <div className='bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center border border-blue-100'>
//                 <h4 className='font-semibold text-gray-900 mb-2'>Нужна помощь?</h4>
//                 <p className='text-gray-600 mb-4'>
//                   Наша команда готова ответить на все ваши вопросы
//                 </p>
//                 <div className='flex flex-col sm:flex-row gap-3 justify-center'>
//                   <button className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium'>
//                     Написать в чат
//                   </button>
//                   <button className='border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium'>
//                     Позвонить
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Section>
//         </ContainerLayouts.Narrow>
//       </ContainerLayouts.Content>
//     </div>
//   )
// }
