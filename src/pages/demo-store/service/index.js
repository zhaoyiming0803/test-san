/**
 * @file services/index.js
 * @author zhaoyiming0803@gmail.com
 */
import axios from 'axios';

export const getData = () => axios.get('/api/getData');
export const publish = data => axios.post('/api/publish', data);
