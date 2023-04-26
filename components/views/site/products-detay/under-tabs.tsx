import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import DescraptionTab from './tabs-contents/descraptions';
import ReviewTab from './tabs-contents/review';
import CommentsTab from './tabs-contents/comments';
import ContentType from 'types/products';

const onChange = (key: string) => {
    console.log(key);
};

const UnderTabs = ({ data }: { data: ContentType }) => <Tabs defaultActiveKey="3" items={[
    {
        key: '1',
        label: `الوصف`,
        children: <DescraptionTab data={data} />,
    },
    {
        key: '2',
        label: `المراجعات`,
        children: <CommentsTab data={data} />,
    },
    // {
    //     key: '3',
    //     label: `التعليقات`,
    //     children: <CommentsTab data={data} />,
    // },
]} onChange={onChange} />;

export default UnderTabs;