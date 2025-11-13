import moment from "moment";

export const calculateRemainingDays = (expireDate: string | undefined): string => {
    if (!expireDate) return 'Chưa đăng ký';

    const expiry = moment.utc(expireDate);
    const now = moment.utc();

    if (expiry.isSameOrBefore(now, 'second')) {
        return 'Đã hết hạn';
    }

    const diffDays = expiry.diff(now, 'days');

    if (diffDays > 0) {
        return `${diffDays} ngày`;
    } else {
        return 'Hết hạn hôm nay';
    }
};

export const formatMinutesToSecondsString = (durationInMinutes: number): string => {
    if (durationInMinutes <= 0) return '0 giây';

    const totalSeconds = Math.round(durationInMinutes * 60);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    let result = '';

    if (minutes > 0) {
        result += `${minutes} phút`;
    }

    if (seconds > 0) {
        if (result.length > 0) {
            result += ' ';
        }
        result += `${seconds} giây`;
    }
    if (minutes === 0 && seconds > 0) {
        return `${seconds} giây`;
    }

    return result.trim();
};