import { categoryProducts } from '~/api/_categoryProducts';
import useStyles from '~/hooks/useStyles';
import styles from './CategoryProducts.module.scss';

function CategoryProducts() {
  const cs = useStyles(styles)

  return (
    <div className={cs('category_products')}>
        <ul className={cs('product_list')}>
            {categoryProducts.map((item, index) => (
                <li key={index} className={cs('product_item')}>
                    <a href='#' className={cs('product_item_link')}>
                        <figure >
                            <img loading='lazy' src={item.src} alt='category' className={cs('product_item_img')}/>
                            <figcaption className={cs('product_item_text')}>{item.name}</figcaption>
                        </figure>
                    </a>
                </li>
            ))}
            
        </ul>
    </div>
  )
}

export default CategoryProducts