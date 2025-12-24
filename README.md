# Preact Vite Bundle Boilerplate

# `create-preact`

<h2 align="center">
  <img height="256" width="256" src="./Src/Assets/LogoStc.svg">
</h2>

# Custom Preact Boilerplate for STC needs!

## Getting Started

- `npm install` - Install all deps if first time. Good luck, have fun!

- `npm run dev` - Starts a dev server at http://localhost:5173/

- `npm run dev:reconfigure` - Starts a dev server but before reconfigures themes on repo side using python and calls other theme scripts to update on the preact project side

- `npm run build` - Builds for production, emitting to `dist/`

- `npm run preview` - Starts a server at http://localhost:4173/ to test production build locally

- `generate:process-python-theme`: Start it first when you changed something in ForensicTheme repo or configuring project first time. This script incapsulated inside generate:theme script in package.json so you do not need to call it first if you call dev:reconfigure or generate:themes.

- `register:themes`: Generate some meta types in `./Autogen/Themes/ForensicThemes` directory needs to import stuff almost on fly.

- `npm run generate:theme-tailwind` - Generates Tailwind port for basic forensic theme which is Material Builder tokenized

# 🎯 UI Component System Roadmap & Checklist

## 📁 Project Structure

```
Src/
├── components/              # Все компоненты
│   ├── ui/                 # Базовые UI компоненты
│   ├── forms/              # Формы и поля ввода
│   ├── layout/             # Компоненты макета
│   ├── feedback/           # Уведомления и индикаторы
│   ├── data-display/       # Отображение данных
│   ├── navigation/         # Навигационные элементы
│   └── widgets/            # Бизнес-виджеты (опционально)
├── hooks/                  # Кастомные React хуки
├── styles/                 # Стили и темы
├── utils/                  # Вспомогательные функции
└── types/                  # TypeScript типы
```

## ✅ Phase 1: Foundation (Атомарные компоненты)

### 🎨 **Typography & Basics**

- [ ] `Text` - Базовый текстовый компонент с вариантами
- [ ] `Heading` - Заголовки h1-h6
- [ ] `Label` - Метки для форм
- [ ] `Caption` - Подписи и мелкий текст
- [ ] `Icon` - Обертка для SVG иконок
- [ ] `Divider` - Разделительная линия

### 🖱️ **Buttons & Interactions**

- [ ] `Button` - Основная кнопка с вариантами (primary, secondary, ghost)
- [ ] `IconButton` - Кнопка с иконкой
- [ ] `ButtonGroup` - Группа кнопок
- [ ] `Link` - Стилизованная ссылка

### 📝 **Form Elements (Inputs)**

- [ ] `Input` - Текстовое поле
- [ ] `TextArea` - Многострочное текстовое поле
- [ ] `Select` - Выпадающий список
- [ ] `Checkbox` - Чекбокс
- [ ] `Radio` - Радио-кнопка
- [ ] `Switch` - Переключатель
- [ ] `Slider` - Ползунок
- [ ] `DatePicker` - Выбор даты

### 🎭 **Feedback & Indicators**

- [ ] `Spinner` / `Loader` - Индикатор загрузки
- [ ] `ProgressBar` / `ProgressCircle` - Прогресс бар
- [ ] `Skeleton` - Скелетон для загрузки
- [ ] `Badge` - Бейдж/метка

### 🎪 **Overlays & Popups**

- [ ] `Tooltip` - Всплывающая подсказка
- [ ] `Popover` - Контекстное меню/попап
- [ ] `Modal` (уже есть) - Модальное окно ✅

---

## ✅ Phase 2: Molecular Components (Комбинации)

### 📋 **Form Components**

- [ ] `FormField` - Поле формы с лейблом, инпутом и ошибкой
- [ ] `Form` - Обертка формы с валидацией
- [ ] `SearchInput` - Поисковое поле с иконкой
- [ ] `InputGroup` - Группа инпутов (например, префикс/суффикс)

### 🃏 **Cards & Containers**

- [ ] `Card` - Карточка с header/body/footer
- [ ] `Accordion` / `Collapse` - Сворачиваемый блок
- [ ] `Alert` - Уведомление/предупреждение
- [ ] `Toast` / `Notification` - Всплывающее уведомление

### 🧭 **Navigation**

- [ ] `Tabs` - Табы/вкладки
- [ ] `Breadcrumbs` - Хлебные крошки
- [ ] `Pagination` - Пагинация
- [ ] `Steps` / `Stepper` - Шаги процесса

### 📊 **Data Display**

- [ ] `Table` / `DataTable` - Таблица данных
- [ ] `List` / `VirtualList` - Список с виртуализацией
- [ ] `Grid` - Сетка для карточек

---

## ✅ Phase 3: Organisms & Layout (Сложные блоки)

### 🏗️ **Layout Components**

- [ ] `Container` - Ограничивающий контейнер
- [ ] `GridLayout` - Сеточный layout
- [ ] `SplitPanel` - Разделенная панель
- [ ] `Drawer` / `SidePanel` - Выдвижная панель
- [ ] `Header` / `Navbar` - Шапка сайта
- [ ] `Footer` - Подвал сайта
- [ ] `Sidebar` - Боковая панель

### 🎪 **Complex Modals & Dialogs**

- [ ] `ConfirmDialog` - Диалог подтверждения
- [ ] `FullScreenModal` - Полноэкранная модалка
- [ ] `BottomSheet` - Модалка снизу (для мобильных)

### 📈 **Data Visualization**

- [ ] `Chart` (обертка для графиков)
- [ ] `StatsCard` - Карточка со статистикой
- [ ] `Timeline` - Временная шкала
- [ ] `KanbanBoard` - Канбан доска

### 🔧 **Editors & Rich Content**

- [ ] `RichTextEditor` - Визуальный редактор
- [ ] `CodeEditor` - Редактор кода
- [ ] `MarkdownRenderer` - Рендерер markdown

---

## ✅ Phase 4: System & Infrastructure

### 🎭 **Providers & Context**

- [ ] `ThemeProvider` - Провайдер темы
- [ ] `ToastProvider` - Глобальная система тостов
- [ ] `ModalProvider` - Управление модалками
- [ ] `I18nProvider` - Интернационализация
- [ ] `ErrorBoundary` - Обработка ошибок

### 🛠️ **Utility Hooks**

- [ ] `useDisclosure` - Управление открытием/закрытием
- [ ] `useForm` - Управление формами
- [ ] `useMediaQuery` - Медиа-запросы
- [ ] `useLocalStorage` / `useSessionStorage`
- [ ] `useClickOutside` - Клик вне элемента
- [ ] `useKeyPress` - Обработка нажатий клавиш
- [ ] `useDebounce` / `useThrottle`

### 🎨 **Theme & Styling System**

- [ ] Цветовая палитра (light/dark темы)
- [ ] Типографика (шрифты, размеры, межстрочные)
- [ ] Spacing система (отступы)
- [ ] Тени, скругления, границы
- [ ] Анимации и переходы
- [ ] Breakpoints для адаптива

---

## ✅ Phase 5: Advanced & Business Components

### 🛒 **E-commerce (если нужно)**

- [ ] `ProductCard` - Карточка товара
- [ ] `Rating` / `Review` - Рейтинг товара
- [ ] `AddToCartButton` - Кнопка "В корзину"
- [ ] `QuantitySelector` - Выбор количества
- [ ] `Price` - Компонент отображения цены

### 👥 **User & Social**

- [ ] `Avatar` - Аватар пользователя
- [ ] `UserCard` - Карточка пользователя
- [ ] `Comment` / `Review` - Комментарий/отзыв
- [ ] `ChatMessage` - Сообщение чата

### 📅 **Calendar & Scheduling**

- [ ] `Calendar` - Календарь
- [ ] `EventCard` - Карточка события
- [ ] `TimePicker` - Выбор времени
- [ ] `ScheduleView` - Просмотр расписания

### 🎛️ **Dashboard Widgets**

- [ ] `KPIWidget` - Виджет с KPI
- [ ] `ChartWidget` - Виджет с графиком
- [ ] `RecentActivity` - Последняя активность
- [ ] `QuickActions` - Быстрые действия

---

## 🚀 Implementation Priorities

### 🔥 **High Priority (MVP)**

1. ✅ `Modal` - уже есть
2. ✅ `Button` - базовая кнопка
3. ✅ `Input` / `TextArea` - поля ввода
4. ✅ `Toast` / `Notification` - уведомления
5. ✅ `Spinner` / `Loader` - индикаторы загрузки
6. ✅ `Form` / `FormField` - управление формами

### ⚡ **Medium Priority**

1. ✅ `Table` / `DataTable` - таблицы
2. ✅ `Tabs` - вкладки
3. ✅ `Card` - карточки
4. ✅ `Select` / `Checkbox` / `Radio` - элементы форм
5. ✅ `Tooltip` / `Popover` - всплывающие элементы

### 📦 **Low Priority**

1. ✅ Сложные виджеты
2. ✅ Бизнес-специфичные компоненты
3. ✅ Advanced графики и визуализации

---

## 🛠️ Development Tools Checklist

### 📚 **Documentation**

- [ ] Storybook для документации компонентов
- [ ] JSDoc комментарии для всех пропсов
- [ ] README для каждого компонента
- [ ] Примеры использования

### 🧪 **Testing**

- [ ] Unit тесты (Jest + Testing Library)
- [ ] Тесты на accessibility (a11y)
- [ ] Визуальные тесты (Screenshot testing)
- [ ] Интеграционные тесты для форм

### 🎯 **Quality & Standards**

- [ ] TypeScript типы для всех пропсов
- [ ] PropTypes (если не TypeScript)
- [ ] ESLint конфигурация
- [ ] Prettier для форматирования
- [ ] Husky pre-commit хуки
- [ ] Accessibility (ARIA атрибуты)
- [ ] Keyboard navigation поддержка

### 📱 **Responsive & Mobile**

- [ ] Mobile-first подход
- [ ] Touch-friendly компоненты
- [ ] Mobile gestures поддержка
- [ ] Viewport адаптация

---

## 📈 Progress Tracking

### ✅ **Completed**

- [x] `Modal` компонент с анимациями
- [x] Базовые анимации (fadeIn, slideInUp, spin)

### 🏗️ **In Progress**

- [ ] Базовая система компонентов
- [ ] Стили и темы

### 📅 **Planned**

- [ ] Phase 1 компоненты
- [ ] Документация и тесты

---

## 🎨 Design Tokens Checklist

### 🎯 **Обязательные токены:**

- [ ] Цвета (primary, secondary, success, warning, error, neutral)
- [ ] Типографика (font families, sizes, weights, line heights)
- [ ] Spacing (0.25rem increments: 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16)
- [ ] Border radius (none, sm, md, lg, full)
- [ ] Shadows (sm, md, lg, xl)
- [ ] Breakpoints (mobile, tablet, desktop, wide)
- [ ] Z-index слои (modal, dropdown, tooltip, etc.)
- [ ] Transitions durations (fast: 150ms, normal: 250ms, slow: 350ms)

---

## 💡 Best Practices Checklist

### 🏗️ **Architecture:**

- [ ] Compound components паттерн где уместно
- [ ] Консистентные пропсы API
- [ ] Forward refs для интерактивных элементов
- [ ] Controlled/uncontrolled режимы
- [ ] Custom хуки для сложной логики

### 🎭 **UX/UI:**

- [ ] Focus states для всех интерактивных элементов
- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success states
- [ ] Disabled states

### ⚡ **Performance:**

- [ ] React.memo для статических компонентов
- [ ] useMemo/useCallback для дорогих вычислений
- [ ] Lazy loading тяжелых компонентов
- [ ] Виртуализация длинных списков
- [ ] Code splitting по компонентам

---

## 📊 Status Legend

- ✅ **Completed** - Реализовано и протестировано
- 🔄 **In Progress** - В разработке
- 📅 **Planned** - Запланировано
- ⚠️ **Needs Review** - Требует ревью/доработки
- ❌ **Blocked** - Заблокировано зависимостями

---

## 🎯 Next Steps (Immediate)

1. **Создать структуру папок** для компонентов
2. **Настроить тему** с базовыми токенами
3. **Реализовать Button** как базовый компонент
4. **Добавить Input** с валидацией
5. **Создать Toast систему**
6. **Настроить Storybook** для документации
