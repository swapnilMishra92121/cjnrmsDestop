import React from "react";
import styled from "styled-components";
import Flex from "antd/lib/flex";
import Card from "antd/lib/card";
import { Grid, Space } from "antd";
import CitationInformation from "./Tabs/CitationInformation/CitationInformation";
import images from "../../../assets";
import Image from "next/image";
import Button from "antd/lib/button";
// import Notes from "./Tabs/Notes/Notes";
import Vehicles from "./Tabs/Vehicles/Vehicles";
import Subject from "./Tabs/Subject/Subject";
import { Location } from "./Tabs/Location/Location";
import Violations from "./Tabs/Violations/Violations";
import { Col, Row } from "antd/lib";
import { FormData } from "./AddCitationsI";


export interface GlanceViewIPrams{
  setformData: (data: FormData) => void;
  formData: FormData;
}

const { Enlarge } = images;

const StyledContainer = styled(Flex)`
  padding: 8px;
`;

const ExtraButtonsLayout = (
  <Flex gap="small">
    <Button
      onClick={(): void => {
        // juvenileSubjectForm.resetForm();
      }}
    >
      Clear all Fields
    </Button>

    <Button
      icon={
        <Image src={Enlarge} alt="maximize section" height={16} width={16} />
      }
      style={{ border: "none" }}
    />
  </Flex>
);

const GlanceView:React.FC<GlanceViewIPrams> = ({setformData, formData}) => {
  return (
    <StyledContainer>
      <Row gutter={16}>
        <Col span={12}>
          <Space size="middle" direction="vertical">
            <Card
              title="Subject"
              bordered={false}
              extra={ExtraButtonsLayout}
              style={{ padding: "12px" }}
            >
              <Subject customWidth="40%" customPadding="0px" isGlanceView setformData={setformData} formData={formData} />
            </Card>

            <Card
              title="Vehicle Information"
              bordered={false}
              extra={ExtraButtonsLayout}
            >
              <Vehicles customWidth="40%" customPadding="0px" isGlanceView setformData={setformData} formData={formData} />
            </Card>
          </Space>
        </Col>
        <Col span={12}>
          <Space size="middle" direction="vertical">
            <Card title="Location" bordered={false} extra={ExtraButtonsLayout}>
              {/* <Location customWidth="40%" customPadding="0px" isGlanceView setformData={setformData} formData={formData} /> */}
            </Card>

            <Card
              title="Violations"
              bordered={false}
              extra={ExtraButtonsLayout}
            >
              <Violations customWidth="40%" customPadding="0px" isGlanceView />
            </Card>

            <Card
              title="Citation Information"
              bordered={false}
              extra={ExtraButtonsLayout}
            >
              <CitationInformation
                customWidth="40%"
                customPadding="0px"
                isGlanceView
              />
            </Card>

            {/* <Card title="Notes" bordered={false} extra={ExtraButtonsLayout}>
          <Notes customWidth="40%" customPadding="0px" isGlanceView />
        </Card> */}
          </Space>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default GlanceView;
