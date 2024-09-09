import axios, { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";

export function isEmail(email: string): boolean {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function formatDate(date: Date | string, format: string, monthFormat: 'short' | 'long' | 'numeric' = 'numeric'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const year = dateObj.getFullYear().toString();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate().toString().padStart(2, '0');
  const hours = dateObj.getHours().toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');

  const dayNames = [
    'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
  ];

  const dayIndex = dateObj.getDay();


  let monthString = '';
  if (monthFormat === 'short') {
    const shortMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    monthString = shortMonthNames[month - 1];
  } else if (monthFormat === 'long') {
    const longMonthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    monthString = longMonthNames[month - 1];
  } else {
    monthString = month.toString().padStart(2, '0');
  }

  return format
    .replace('YYYY', year)
    .replace('MM', monthString)
    .replace('DD', day)
    .replace('L', dayNames[dayIndex])
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
}

export function createNotifcation(message = '', type = 'success') {
  return {
    show: true,
    type: type,
    message: message
  }
}

export function ucwords(input: string, capitalizeOnlyFirstChar: boolean = false): string {
  if(input){
    if (capitalizeOnlyFirstChar) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    } else {
      return input.replace(/\b\w/g, (char) => char.toUpperCase());
    }
  }
  return ''
}

interface DownloadOptions {
  filename?: string;
  onProgress?: (progress: number) => void;
}

export const downloadFile = async (url: string, options?: DownloadOptions): Promise<void> => {
  try {
    if (options?.onProgress) {
      options.onProgress(1);
    }
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
      onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
        if (options?.onProgress) {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
          options.onProgress(progress);
        }
      },
    } as AxiosRequestConfig);

    handleDownload(response, options?.filename || 'file.zip');
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error; // Propagate the error for further handling if needed
  }
};

const handleDownload = (response: AxiosResponse<Blob>, filename: string): void => {
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
};

export function getExtension(filename: string): string | undefined {
  const parts = filename.split('.');
  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
  return undefined;
}