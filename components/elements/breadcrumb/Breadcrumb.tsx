import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import Link from 'next/link';
import BreadcrumbStyle from './breadcrumb.style';
import Text from 'components/utils/text';
import FlexDiv from 'components/utils/flex-div';

interface IPagination {
    path?: string;
    title: string;
    icon?: React.ReactNode
}

const BreadcrumbElement: React.FC<{ page: IPagination[] }> = ({ page }: { page: IPagination[] }) => {
    return (
        <FlexDiv bg="#fff" cstyle={`
            border:1px solid #f9ecec;
        `} padding={[0, 0, 10]} margin={[0, 0, 15]}>
            <Text as="h2" margin={[5, 15, 0]}>{page[0].title}</Text>
            <BreadcrumbStyle>
                <Breadcrumb.Item>
                    <Link href={"/"}>
                        <a>
                            <HomeOutlined /> الصفحة الرئيسية
                        </a>
                    </Link>
                </Breadcrumb.Item>
                {
                    page.map((item: IPagination, index: number) => (
                        <Breadcrumb.Item key={index}>
                            {
                                item.path ? (
                                    <Link href={item.path}>
                                        <a>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </a>
                                    </Link>
                                ) : (
                                    <a>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </a>
                                )
                            }

                        </Breadcrumb.Item>
                    ))
                }
            </BreadcrumbStyle>
        </FlexDiv>
    );
}

export default BreadcrumbElement;