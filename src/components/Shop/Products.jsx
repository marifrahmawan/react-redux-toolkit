import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  {
    id: 'p1',
    title: 'Negeri Para Bedebah',
    price: 16,
    description: 'Korupsi dimana-mana!',
  },
  {
    id: 'p2',
    title: 'Bedebah Di Ujung Tanduk',
    price: 21,
    description: 'Penghianat dimana-mana',
  },
  {
    id: 'p3',
    title: 'Negeri Di Ujung Tanduk',
    price: 23,
    description: 'Bedebah Hampir Mati',
  },
  {
    id: 'p4',
    title: 'Bumi',
    price: 18,
    description: 'Petualangan Lintang',
  },
  {
    id: 'p5',
    title: 'Bulan',
    price: 12,
    description: 'Lintang dan Bulan',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {PRODUCTS.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
