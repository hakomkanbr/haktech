import React, { useState, useEffect } from 'react';
import { Avatar, Button, Card } from 'antd';
import ShopingBtn from './drawer.syle';
import DrawerElement from 'components/elements/drawer/drawer';
import { useRouter } from 'next/router';
import paths from 'paths';
import ContentType from 'types/products';
import { CustumerContext } from "contexts/custumer-context";

const { Meta } = Card;

interface InArabaDrawer {
  open: boolean;
  setArabaOpen: any;
}

const ArabaDrawer: React.FC<InArabaDrawer> = ({
  open,
  setArabaOpen
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ContentType[]>();
  const custumerContext = React.useContext(CustumerContext);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("cart") ?? "[]"));
  }, [open]);

  const redirectToCart = async () => {
    const has_auth = await custumerContext.checkUser();
    if (has_auth) {
      router.push(`/${router.query["slug"]}/${router.query["company-slug"]}${paths.custumer_card}`);
      setArabaOpen(false);
    } else {
      setArabaOpen(false);
      custumerContext.openOrCloseLogin();
      custumerContext.redirectUrl(`/${router.query["slug"]}/${router.query["company-slug"]}${paths.custumer_card}`);
    }
  }

  return (
    <>
      <DrawerElement closeDrawer={setArabaOpen} open={open} title="العربة">
        <ShopingBtn>
          <Button htmlType='button' type='primary' onClick={redirectToCart}>
            شراء الأن
          </Button>
        </ShopingBtn>
        {
          products?.map((item: ContentType, index: number) => (
            <Card key={index} style={{ width: 300, marginTop: 16 }} loading={loading}>
              <Meta
                avatar={<Avatar shape="square" style={{ border: "1px solid #e3e3e3" }} alt="photo" size={64} src={item.mainImageName ?? "/assets/images/default.jpg"} />}
                title={item.title}
                description={item.description}
              />
            </Card>
          ))
        }

      </DrawerElement>
    </>
  );
};

export default ArabaDrawer;