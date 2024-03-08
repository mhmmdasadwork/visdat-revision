import type { ChartData, ChartOptions } from 'chart.js';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  BarElement,
  RadialLinearScale,
  Filler
);

const nilai = {
  ipk: [
    3.77,
    3.83,
    3.83
  ],
  ips: [
    3.77,
    3.88,
    3.83
  ]
}

const maxIpk = Math.max(...nilai.ipk);
const minIpk = Math.min(...nilai.ipk);
const maxIps = Math.max(...nilai.ips);
const minIps = Math.min(...nilai.ips);

const labels = [...new Array(3)].map((_, b) => `Semester ${b + 1}`);

const defaultValue = {
  labels,
  datasets: [
    {
      label: 'IPK',
      data: nilai.ipk,
      borderColor: '#387ADF',
      backgroundColor: '#387ADF',
    },
    {
      label: 'IPS',
      data: nilai.ips,
      borderColor: '#FF9843',
      backgroundColor: '#FF9843',
    }
  ],
}
const options: ChartOptions<'line' | 'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true, // Display legend as circles
      },
    },
    title: {
      display: true,
      text: 'Tugas 1 Visualisasi Data',
    },
    datalabels: {
      display: false
    }


  },
  maintainAspectRatio: false,
  // aspectRatio: 5 / 3,
  layout: {
    padding: {
      top: 32,
      right: 16,
      bottom: 16,
      left: 8
    }
  },

  scales: {
    y: {
      // stacked: true,
      min: 0,
      max: 4,
      ticks: {
        stepSize: 1
      }
    },

  }
};
const barData: ChartData<'bar'> = defaultValue
const keylabels: ('ipk' | 'ips')[] = ['ipk', 'ips'];

const GenerateMinOrMax = ({ value, type }: { value: number, type: ('ipk' | 'ips') }) => {
  let classTd = "p-2 whitespace-nowrap text-center "
  if (type === "ipk") {
    if (value === maxIpk) classTd += 'font-extrabold text-[#36AE7C]'
    else if (value === minIpk) classTd += 'font-extrabold text-[#B80000]'
  }
  else if (type === "ips") {
    if (value === maxIps) classTd += 'font-extrabold text-[#36AE7C]'
    else if (value === minIps) classTd += 'font-extrabold text-[#B80000]'
  }

  return (
    <td className={classTd}>
      {value}
    </td>
  )
}


export default function App() {

  return <main className="w-full max-w-screen-xl container pt-10">


    <div className="grid grid-cols-1 gap-3 pt-5 lg:grid-cols-2">
      {/* <div className="p-2  bg-white shadow-lg rounded-lg overflow-hidden w-full h-[500px]">
        <Line options={{ ...options, plugins: { ...options.plugins, title: { text: "Perkembangan Akademik IPK and IPS", display: true, } } }} data={lineData} />
      </div> */}

      <div className="w-full pt-0 pb-10 overflow-x-scroll lg:overflow-hidden">
        <table className="w-full  table-auto ">
          <thead className="text-xs font-semibold uppercase text-white bg-[#387ADF]">
            <tr className="bg-[#387ADF]">
              <th className="p-2 whitespace-nowrap"></th>
              {labels.map((_, value) => (
                <th key={value} className="p-2 whitespace-nowrap">{`Semester ${value + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm divide-y-2 divide-gray-300">
            {keylabels.map((name, index: number) => (
              <tr key={index} >
                <td className={`p-2 whitespace-nowrap font-extrabold text-center ${name === "ipk" ? 'text-[#387ADF]' : 'text-[#FF9843]'}`}>{name.toUpperCase()}</td>
                {nilai[name].map((val: number, idx: number) => (
                  // <td key={idx} className="p-2 whitespace-nowrap text-center">{val}</td>
                  <GenerateMinOrMax key={idx} value={val} type={name} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-2 bg-white shadow-lg rounded-lg overflow-hidden w-full h-[500px]">
        <Bar options={{ ...options, plugins: { ...options.plugins, title: { text: "Perkembangan Akademik IPK and IPS (2022 - 2024)", display: true, } } }} data={barData} />
      </div>
    </div>


  </main >
}

