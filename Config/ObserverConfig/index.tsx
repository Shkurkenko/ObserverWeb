import { IMenubarSetup } from '../../Src/Shared/Interfaces/Main.interface'
import { FastAlertsSpace } from '../../Src/Shared/Interfaces/FastAlerts.interface'
import { IMenubarModel } from '../../Src/Components/Menubar'
import { TaskSidebar } from '../../Src/Components/TaskSidebar'
import { Journal } from '../../Src/Components/Journal'
import { ReoSpace } from '../../Src/Shared/Interfaces/Reo.interface'
import { TableSpace } from '../../Src/Shared/Interfaces/Table.interface'
import { IReoColumnsModelsConfig } from '../../Src/Shared/Interfaces/Main.interface'

export namespace ObserverConfig {
  export const AlertsConfig = {
    general: {
      transition: 0.2,
    },
    error: {
      color: '#F44336',
      icon: (
        <svg
          class='w-8 h-8 text-[#F44336]'
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
            d='M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      ),
    },
    info: {
      color: '#2a86cf',
      icon: (
        <svg
          class={`w-8 h-8 text-[#0288D1]`}
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
            d='M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      ),
    },
    success: {
      color: '#4CAF50',
      icon: (
        <svg
          class='w-8 h-8 text-[#4CAF50]'
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
            d='M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      ),
    },
    warning: {
      color: '#FDD835',
      icon: (
        <svg
          class='w-8 h-8 text-[#FDD835]'
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
            d='M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
          />
        </svg>
      ),
    },
  }

  export const FastAlerts: FastAlertsSpace.IStyleConfig = {
    general: {
      transition: 0.3,
    },
    error: {
      icon: ObserverConfig.AlertsConfig.error.icon,
      iconColor: '#ea5233',
      backgroundColor: '#341b2a',
      color: '#ecc6c9',
      borderColor: '#4b1d2c',
    },
    success: {
      icon: ObserverConfig.AlertsConfig.success.icon,
      iconColor: '#5dad58',
      backgroundColor: '#0e2a2c',
      color: '#b9f8b5',
      borderColor: '#0d3b30',
    },
    warning: {
      icon: ObserverConfig.AlertsConfig.warning.icon,
      iconColor: '#fad947',
      backgroundColor: '#262724',
      color: '#fef9b8',
      borderColor: '#322f22',
    },
    info: {
      icon: ObserverConfig.AlertsConfig.info.icon,
      iconColor: '#0288D1',
      backgroundColor: '#12233e',
      color: '#8ec5ff',
      borderColor: '#162c54',
    },
  }

  export const MenubarConfig: IMenubarModel = {
    currentIndex: 0,
    items: [
      {
        id: 0,
        role: IMenubarSetup.TaskManager,
        active: false,
        icon: (
          <svg
            class='w-9 h-9 text-gray-800 dark:text-white'
            aria-hidden='true'
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
              d='M6 6h8m-8 4h12M6 14h8m-8 4h12'
            />
          </svg>
        ),
        content: <TaskSidebar />,
      },
      {
        id: 1,
        role: IMenubarSetup.Notifications,
        active: false,
        icon: (
          <svg
            class='w-6 h-6 text-gray-800 dark:text-white'
            aria-hidden='true'
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
              d='M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z'
            />
          </svg>
        ),
        content: <Journal />,
      },
    ],
  }

  export const ReoColumnModelsConfig: IReoColumnsModelsConfig = {
    [ReoSpace.IScanTypes.Gsm]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'LAC/TAC',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Регион',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Lte]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Umts]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'CID',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'LAC/TAC',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Страна',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Регион',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Operator.toString(),
        type: TableSpace.IColumnTypes.Operator,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Оператор',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.RxLevel.toString(),
        type: TableSpace.IColumnTypes.Signal,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Уровень Сигнала',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Bluetooth]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Some',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Bluetooth',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Columns',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.Wifi]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Some',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'WiFi',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'Columns',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
    [ReoSpace.IScanTypes.FiveG]: [
      {
        role: TableSpace.IRoles.Enum.toString(),
        type: TableSpace.IColumnTypes.Enum,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '#',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Cid.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '5G',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.LacTac.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'for',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mcc.toString(),
        type: TableSpace.IColumnTypes.Country,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: 'real',
        align: TableSpace.IColumnAlignment.Center,
      },
      {
        role: ReoSpace.IRoles.Mnc.toString(),
        type: TableSpace.IColumnTypes.Text,
        width: 130,
        minWidth: 50,
        maxWidth: 200,
        label: '?',
        align: TableSpace.IColumnAlignment.Center,
      },
    ],
  }
}
