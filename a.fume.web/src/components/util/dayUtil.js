import dayjs from 'dayjs';

const DayUtil = {
    diffFromNow: (date) => {
        let content;
        const diffDay = dayjs().diff(date, 'day');
        if (diffDay > 0) content = `${diffDay}일`;
        else {
            const diffHour = dayjs().diff(date, 'hour');
            if (diffHour > 0) {
                content = `${diffHour}시간`;
            } else {
                content = `${dayjs().diff(date, 'minute')}분`;
            }
        }
        return `${content}전`;
    },
    dateString: (value) => {
        return dayjs(value).format('YYYY/MM/DD');
    },
};
export default DayUtil;
