export interface PopoverComponentIProps {
  InnerContent: React.ComponentType<InnerContentProps>;
  InnerButtonComponents: React.ComponentType<InnerButtonComponentsIProps>;
  InnerContentProps: InnerContentProps;
  InnerButtonComponentsIProps: InnerButtonComponentsIProps;
}

export interface InnerContentProps {
  logout: () => void;
}

export interface InnerButtonComponentsIProps {
  setopenPopover: (data: boolean) => void;
  openPopover: boolean;
}
