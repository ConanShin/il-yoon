// @ts-ignore
import {categories} from '@/cafe24info'

const subMenus: any = categories.menu2

export const menuNameToCategory = (py: string) => {
    return subMenus[py]
}

export const productToMenuName = (product: any) => {
    const categoryId = Object.values(subMenus).find(categoryId => (product.category || []).map((productCategory: any) => productCategory.category_no).includes(categoryId))
    return Object.keys(subMenus).find(key => categoryId === subMenus[key])

}

export const productToCategory = (product: any) => {
    const category = product.category.find((category: any) => Object.values(subMenus).includes(category.category_no))
    if (category) return category.category_no
    else return null
}

export const makeHash = (length: number) => {
    let result             = ''
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}