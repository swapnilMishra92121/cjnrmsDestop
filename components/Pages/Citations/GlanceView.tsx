import React from "react";
import styled from "styled-components";
import { Card, Col, Row, Space, Button, Grid } from "antd";
import CitationInformation from "./Tabs/CitationInformation/CitationInformation";
import images from "../../../assets";
import Image from "next/image";
import Vehicles from "./Tabs/Vehicles/Vehicles";
import Subject from "./Tabs/Subject/Subject";
import { Location } from "./Tabs/Location/Location";
import Violations from "./Tabs/Violations/Violations";
import Notes from "./Tabs/Notes/Notes";
import { FormData } from "./AddCitationsI";

export interface GlanceViewIPrams {
  setformData: (data: FormData) => void;
  formData: FormData;
  activeBtn: number | null,
  setActiveBtn: (data: number) => void;
}

const { Enlarge } = images;

// Styled container to ensure no scrollbars
const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  max-width: 100%;
`;


const StyledCard = styled(Card)`
  .ant-card-body {
    padding: 0px 24px 8px 24px;
  }
`;

const ExtraButtonsLayout = (
  <Space>
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
  </Space>
);

const GlanceView: React.FC<GlanceViewIPrams> = ({ setformData, formData, activeBtn, setActiveBtn }) => {
  return (
    <>
      {
        activeBtn === 4 ? <Card 
        title="Officer Notes"
        bordered={false} 
        extra={ExtraButtonsLayout} 
        style={{ width: "100%", transform: "scaleY(0.65)", marginTop: "-15.3%", marginBottom: "-14.5%"}}>
          <Notes
            customWidth="40%"
            customPadding="0px"
            isGlanceView
            setformData={setformData}
            formData={formData}
            setActiveBtn={setActiveBtn}
          />
        </Card> :
          <StyledContainer>
            <Row gutter={16} style={{ width: "100%", transform: "scaleY(0.75)", marginTop: "-9.9%", marginBottom: "-6.5%" }}>
              <Col span={12}>
                <Space size="middle" direction="vertical" style={{ width: "100%" }}>
                  <StyledCard
                    title="Subject"
                    bordered={false}
                    extra={ExtraButtonsLayout}
                  // style={{ padding: "12px" }}
                  >
                    <Subject
                      customWidth="40%"
                      customPadding="0px"
                      isGlanceView
                      setformData={setformData}
                      formData={formData}
                    />
                  </StyledCard>

                  <StyledCard
                    title="Vehicle Information"
                    bordered={false}
                    extra={ExtraButtonsLayout}
                  >
                    <Vehicles
                      customWidth="40%"
                      customPadding="0px"
                      isGlanceView
                      setformData={setformData}
                      formData={formData}
                    />
                  </StyledCard>
                </Space>
              </Col>
              <Col span={12}>
                <Space size="middle" direction="vertical" style={{ width: "100%" }}>
                  <StyledCard title="Location" bordered={false} extra={ExtraButtonsLayout}>
                    <Location
                      customWidth="40%"
                      customPadding="0px"
                      isGlanceView
                      setformData={setformData}
                      formData={formData}
                    />
                  </StyledCard>

                  <StyledCard title="Violations" bordered={false} extra={ExtraButtonsLayout}>
                    <Violations
                      customWidth="40%"
                      customPadding="0px"
                      isGlanceView
                      setformData={setformData}
                      formData={formData}
                    />
                  </StyledCard>

                  <StyledCard
                    title="Citation Information"
                    bordered={false}
                    extra={ExtraButtonsLayout}
                  >
                    <CitationInformation
                      customWidth="40%"
                      customPadding="0px"
                      isGlanceView
                      setformData={setformData}
                      formData={formData}
                    />
                  </StyledCard>
                </Space>
              </Col>
            </Row>
          </StyledContainer>
      }
    </>
  );
};

export default GlanceView;
