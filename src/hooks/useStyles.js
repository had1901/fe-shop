import clsx from 'clsx'


const useStyles = (styles) => {

    const cs = (classCustom, ...classGlobal) => {
        if(typeof classCustom !== 'string') {
          throw new Error('Cần truyền một chuỗi vào đây!!!')
        }
        if(classCustom === '') {
          return ''
        }
        let classes = classCustom && classCustom.split(' ')
        const result = classes.map((item) => {
          return clsx(styles[item], ...classGlobal)
        })
        return result.join(' ')
      }

    return [cs]
}

export default useStyles