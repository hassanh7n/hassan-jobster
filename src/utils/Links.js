import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile, ImStatsBars } from 'react-icons/im';
import { AiOutlineBarChart } from "react-icons/ai";
import { AiOutlineFileText } from "react-icons/ai";

import { BsPersonCircle } from "react-icons/bs";
const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <ImStatsBars />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <AiOutlineFileText />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <BsPersonCircle />,
  },
];


export default links;