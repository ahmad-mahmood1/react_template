export const utils = {
  getErrorString: (error: any) => {
    let textError = '';
    const arr = Object.values(error.data).flat();
    for (let i = 0; i < arr.length; i += 1) {
      textError += `${arr[i]}\n`;
    }
    return textError;
  },
  convertUtcToLocalTime: (utcTime: string) => {
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: localTimeZone,
    };
    const local = new Date(utcTime);
    return local.toLocaleString('en-US', options);
  },
  isBetweenTimeRange: (startTime: string, endTime: string) => {
    const currentDate = new Date();
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const currentDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      ...currentTime.split(':').map(Number),
    );
    const startDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      ...startTime.split(':').map(Number),
    );
    const endDateTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      ...endTime.split(':').map(Number),
    );

    if (startDateTime <= endDateTime) {
      return currentDateTime >= startDateTime && currentDateTime <= endDateTime;
    } else {
      return currentDateTime >= startDateTime || currentDateTime <= endDateTime;
    }
  },
};
