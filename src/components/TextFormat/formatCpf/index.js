export const formatCpf = (cpf) => {
    const firstBlock = cpf.substr(0, 3)
    const secondBlock = cpf.substr(4, 3)
    const thirdBlock = cpf.substr(8, 3)
    const fourBlock = cpf.substr(12, 2)
    const cpfFormated = firstBlock + secondBlock + thirdBlock + fourBlock
    return cpfFormated;

}