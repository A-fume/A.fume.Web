const Hangul = {
    firstChoHangul: (str) => {
        const cho = [
            'ㄱ',
            'ㄲ',
            'ㄴ',
            'ㄷ',
            'ㄸ',
            'ㄹ',
            'ㅁ',
            'ㅂ',
            'ㅃ',
            'ㅅ',
            'ㅆ',
            'ㅇ',
            'ㅈ',
            'ㅉ',
            'ㅊ',
            'ㅋ',
            'ㅌ',
            'ㅍ',
            'ㅎ',
        ];
        const code = str.charCodeAt(0) - 44032;
        return code > -1 && code < 11172 ? cho[Math.floor(code / 588)] : '';
    },
};
export default Hangul;
