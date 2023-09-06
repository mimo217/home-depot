import "./ItemList.module.scss";
import ItemListItem from "../ItemListItem/ItemListItem";

export default function ItemList({
  handleAddToOrder,
  setItemListItems,
  itemListItems
}) {
  /* const items = itemListItems.map(item =>
    <ItemListItem
      key={item._id}
      handleAddToOrder={handleAddToOrder}
      itemListItem={item}
      setItemListItems={setItemListItems}
      itemListItems={itemListItems}
    />
  ); */

  const items = [...Array(16)].map((_, i) => (
    <div className="item" key={i}>
      <ItemListItem />
    </div>
  ));

  return <div className="itemList">{items}</div>;
}