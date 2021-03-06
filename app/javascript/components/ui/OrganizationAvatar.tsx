import { observer } from "mobx-react";
import * as React from "react";
import { OrganizationsAPI } from "../api/v1/OrganizationsAPI";
import { Styles } from "./Styles";

type IProps = {
  organization: any;
  dontRenderIfNoImage?: boolean;
  style?: React.CSSProperties;
};
type IState = {
  image: any;
  loading: boolean;
};

@observer
class OrganizationAvatar extends React.Component<IProps, IState> {
  state: IState = {
    image: null,
    loading: true
  };

  async componentDidMount() {
    const imageResponse = await OrganizationsAPI.getImage({ organizationId: this.props.organization.id });
    this.setState({ image: imageResponse.image, loading: false });
  }

  render() {
    const hasImage = !!this.state.image;

    if (!hasImage && this.props.dontRenderIfNoImage) {
      return null;
    }

    return (
      <div style={{ display: "inline" }}>
        <div className={this.state.loading ? undefined : "fade-in-fast"} style={{ display: "flex", opacity: this.state.loading ? 0 : 1 }}>
          {hasImage &&
            <img
              style={{
                height: 40,
                width: 40,
                borderRadius: Styles.DEFAULT_BORDER_RADIUS,
                ...this.props.style
              }}
              src={this.state.image}
              alt="organization image"
            />
          }
          {!hasImage && <div
            style={{
              height: 40,
              width: 40,
              background: Styles.COLOR_PRIMARY_LIGHT,
              color: Styles.COLOR_PRIMARY,
              borderRadius: Styles.DEFAULT_BORDER_RADIUS,
              lineHeight: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textTransform: "uppercase",
              fontSize: 14,
              ...this.props.style
            }}
          >
            {this.props.organization && this.props.organization.attributes && this.props.organization.attributes.name.substr(0, 2)}
          </div>}
        </div>
      </div>
    );
  }
}

export { OrganizationAvatar };
