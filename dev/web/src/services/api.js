import axios from 'axios';

import { url } from '../config/constants';

const api = axios.create({url});

export default api;