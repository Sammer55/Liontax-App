export const formatTel = (tel) => {
    const telToString = tel.toString()
    const DDD = telToString.substr(1, 2)
    const firstsNumbers = telToString.substr(5, 5)
    const lastNumbers = telToString.substr(11, 4)
    const telFormated = '+55' + DDD + firstsNumbers + lastNumbers
    return telFormated;

}