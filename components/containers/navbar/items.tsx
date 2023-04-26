import React, { useState } from "react";
import { Menu } from "antd";
import Container from "../../utils/container";
import styled from "styled-components";
import categoriesType from "types/categories";
import Link from "next/link";
import getTypeByEnum from "helpers/getItemByEnum";
import { useRouter } from "next/router";
import { MenuStyle } from "./style";

const NavItems: React.FC<{ data: categoriesType[] }> = ({ data }) => {
  const router = useRouter();
  const [initial, setInitial] = useState<any>({
    name: "الصفحة الرئيسية",
    // companySlug: "test1Company",
    companyType: 1,
    id: 1,
    slug: "",
    sorting: 1
  });
  const renderItem = () => {
    const lo1 = data && data.length ? data.map((item: categoriesType, index: number) => ({
      label: (
        <Link
          href={{
            pathname: "/[slug]/[company-slug]/[category-slug]",
            query: {
              slug: getTypeByEnum(item.companyType),
              "company-slug": item.companySlug,
              "category-slug": item.slug,
            },
          }}
        >
          {item.name}
        </Link>
      ),
      key: index,
    })) : [];
    return [{
      label: (
        <Link
          href={
            router.query["company-slug"] ? {
              pathname: "/[slug]/[company-slug]",
              query: {
                slug: getTypeByEnum(initial.companyType),
                "company-slug": router.query["company-slug"]
              }
            } : {
              pathname: "/[slug]",
              query: {
                slug: router.query["slug"],
              }
            }}
        >
          {initial.name}
        </Link>
      ),
      key: -1,
    }, ...lo1]
  }
  return (
    <nav style={{ borderBottom: "1px solid #ece5dd", background: "#f5f5f5" }}>
      <Container>
        <MenuStyle
          mode="horizontal"
          items={renderItem()}
        />
      </Container>
    </nav>
  );
};

export default NavItems;
