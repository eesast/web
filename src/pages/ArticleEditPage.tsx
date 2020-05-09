import { IArticle, IAppState, IUser } from "../redux/types/state";
import { withRouter, useHistory } from "react-router-dom";
import { getArticle, getArticleByAlias } from "../redux/actions/weekly";
import { connect } from "react-redux";
import md2wx from "md2wx";
import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./ArticleEditPage.module.css";
import {
  Form,
  Tooltip,
  Row,
  Col,
  Icon,
  Input,
  Button,
  message,
  Modal,
  Alert,
} from "antd";
import { FormComponentProps, ValidationRule } from "antd/lib/form";
import api from "../api";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Tags from "../components/Tags";
import MultipleUpload from "../components/MultipleUpload";
import { UploadFile } from "antd/lib/upload/interface";
import axios from "axios";

interface IArticleEditPageStateProps {
  user: IUser;
  token: string;
  fetching: boolean;
  article: IArticle;
  status?: "post" | "update";
  error?: Error | null;
}

interface IArticleEditPageDispatchProps {
  getArticle: (articleId: number) => void;
  getArticleByAlias: (alias: string, status?: "post" | "update") => void;
}

type IArticleEditPageProps = IArticleEditPageStateProps &
  IArticleEditPageDispatchProps;

const ArticleEditPage: React.FC<IArticleEditPageProps> = (props) => {
  const { article, token } = props;
  const [text, setText] = useState(
    "# EESAST Weekly Editor\n\n> Powered by EESAST\n>\n> Thanks to:\n> - [react](https://react.docschina.org/)\n> - [ant.design](https://ant.design/index-cn)\n> - [react-markdown-editor-lite](https://harrychen0506.github.io/react-markdown-editor-lite/)\n> - [md2wx](https://github.com/eesast/md2wx)\n> - ...\n\n## How to use\n\n`$\\LaTeX$` is supported\n    > with the help of [`katex`](https://github.com/KaTeX/KaTeX)\n\n```markdown\n\n# h1\n## h2\n### h3\n#### h4\n\n---\n\n*Italic*\n\n**Bold**\n\n---\n\n- unordered\n- unordered\n\n1. ordered\n2. ordered\n\n---\n\n![logo](https://api.eesast.com/static/images/logo.png)\n\n```\n\n# h1\n## h2\n### h3\n#### h4\n\n---\n\n*Italic*\n\n**Bold**\n\n---\n\n- unordered\n- unordered\n\n1. ordered\n2. ordered\n\n---\n\n![logo](https://api.eesast.com/static/images/logo.png)\n"
  );
  // const [highlight, setHighlight] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showImgManage, setShowImgManage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const topFormRef = useRef<ITopInfoFormProps>();
  const buttomFormRef = useRef<IButtomInfoFormProps>();
  const [info, setInfo] = useState(article);

  const [imageFileList, setImageFileList] = useState<UploadFile[]>([]);
  const [coverImageFile, setCoverImageFile] = useState<UploadFile[]>([]);

  const history = useHistory();

  const handleCoverImageChange = (fileList: UploadFile[]) => {
    setCoverImageFile(fileList);
  };

  const handleFileListChange = (fileList: UploadFile[]) => {
    setImageFileList(fileList);
  };

  const handleFileListRemove = async (file: UploadFile) => {
    try {
      await axios.delete(file.response);
      message.success("删除图片成功");
      return true;
    } catch {
      message.error("删除图片失败");
      return false;
    }
  };

  const handleEditorChange = (para: { html: string; text: string }) => {
    setText(para.text);
  };

  const handleConfirmSubmit = async () => {
    const author: string = topFormRef.current?.form.getFieldValue("author");
    const authorId = await api.getUserId(author);
    if (authorId === 0) {
      setShowModal(true);
      return;
    }
    setInfo((state) => ({
      ...state,
      title: topFormRef.current?.form.getFieldValue("title"),
      alias: topFormRef.current?.form.getFieldValue("alias"),
      author: author,
      authorId: authorId,
      content: text,
      abstract: buttomFormRef.current?.form.getFieldValue("abstract"),
      image: coverImageFile[0].url!,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (info.id === 0) {
        await api.postArticle({
          title: info.title.trim(),
          alias: info.alias.trim(),
          authorId: info.authorId,
          content: info.content,
          abstract: info.abstract,
          image: info.image,
          tags: [...info.tags, "underReview"],
        });
        message.success("发布成功，请耐心等待审核");
        history.replace(`/weekly/manage`);
      } else {
        await api.updateArticle(info.id, {
          title: info.title.trim(),
          alias: info.alias.trim(),
          authorId: info.authorId,
          content: info.content,
          abstract: info.abstract,
          image: info.image,
          tags: info.tags,
        });
        message.success("更新成功，请耐心等待审核");
        history.replace(`/weekly/articles/${info.alias}`);
      }
    } catch (error) {
      if (error.response.data === "409 Conflict: Alias already exists") {
        message.error("别名重复，请更换文章的别名");
      } else if (
        error.response.data === "422 UnProcessable Entity: Missing contents"
      ) {
        message.error("文章正文为空");
      } else {
        if (info.id === 0) {
          message.error("发布失败，请与管理联系");
        } else {
          message.error("更新失败，请与管理联系");
        }
      }
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setInfo((state) => ({ ...state, tags: tags }));
  };

  const handleImageUpload = async (originFile: File) => {
    let file: UploadFile = {
      uid: "-1" + originFile.name,
      name: originFile.name,
      size: originFile.size,
      type: originFile.type,
      originFileObj: originFile,
    };
    const response = await api.uploadImage(file);
    file.url = axios.defaults.baseURL + response;
    file.response = response;
    let newFileList = imageFileList;
    newFileList.push(file);
    setImageFileList(newFileList);
    return file.url;
  };

  return (
    <div className={styles.root}>
      <div style={{ width: "90%", margin: "20px auto" }}>
        <WrappedTopInfoForm
          props={props}
          tags={info.tags}
          onTagsChange={handleTagsChange}
          wrappedComponentRef={topFormRef}
        />
      </div>
      <div>
        <MdEditor
          style={{ width: "100%", height: "500px" }}
          plugins={[
            "header",
            "fonts",
            "table",
            "image",
            "link",
            "clear",
            "logger",
            "mode-toggle",
          ]}
          value={text}
          renderHTML={(text: string) => md2wx.renderHtml(text, true)} // highlight = true
          onChange={handleEditorChange}
          onImageUpload={handleImageUpload}
        />
      </div>
      <div style={{ width: "100%", margin: "20px auto" }}>
        <WrappedButtomInfoForm
          props={props}
          coverImage={coverImageFile}
          wrappedComponentRef={buttomFormRef}
          onCoverImageChange={handleCoverImageChange}
          onCoverImageRemove={handleFileListRemove}
          onImgManageClick={() => {
            setShowImgManage(true);
          }}
          onSubmit={() => {
            handleConfirmSubmit();
            setShowConfirm(true);
          }}
        />
      </div>

      <Modal
        title="Error"
        visible={showModal}
        footer={null}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Alert
          message="作者用户名错误"
          description="未找到作者，请检查作者用户名是否正确填写"
          type="error"
          showIcon
        />
      </Modal>
      <Modal
        title="图片管理"
        visible={showImgManage}
        footer={null}
        onCancel={() => {
          setShowImgManage(false);
        }}
      >
        <MultipleUpload
          token={token}
          fileList={imageFileList}
          onFileListChange={handleFileListChange}
          onRemove={handleFileListRemove}
        />
      </Modal>
      <Modal
        title="确认提交？"
        visible={showConfirm}
        onCancel={() => {
          setShowConfirm(false);
        }}
        onOk={handleSubmit}
      >
        <Alert
          message="关于提交"
          description={
            <p>
              请在发布前预览Markdown，确保文章完整可读。
              <br />
              请务必删除没有用到的图片
              <br />
              确定发布该文章吗？
            </p>
          }
          type="info"
          showIcon
        />
      </Modal>
    </div>
  );
};

function mapStateToProps(state: IAppState): IArticleEditPageStateProps {
  return {
    token: state.auth.token!,
    user: state.auth.user!,
    fetching: state.weekly.currentArticle.fetching,
    article: state.weekly.currentArticle.item,
    status: state.weekly.currentArticle.status,
    error: state.weekly.currentArticle.error,
  };
}

const mapDispatchToProps: IArticleEditPageDispatchProps = {
  getArticle,
  getArticleByAlias,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ArticleEditPage)
);

interface ITopInfoFormProps extends FormComponentProps {
  props: IArticleEditPageProps;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

const TopInfoForm = forwardRef<FormComponentProps, ITopInfoFormProps>(
  ({ form, props, tags, onTagsChange }: ITopInfoFormProps, ref) => {
    useImperativeHandle(ref, () => ({ form }));

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const validateAlias: ValidationRule["validator"] = (
      rule,
      value: any,
      callback: any
    ) => {
      const validateRule = /^[a-z-]+$/; // 正则表达式，匹配英文小写字母和短横杠
      if (value && !value.trim().match(validateRule)) {
        callback("请修改别名，仅含小写英文字母和短横杠");
      } else {
        callback();
      }
    };

    return (
      <Form
        style={{ boxSizing: "border-box" }}
        layout="vertical"
        {...formItemLayout}
      >
        <Row gutter={32}>
          <Col span={16}>
            <Form.Item label="标题 Title" hasFeedback>
              {form.getFieldDecorator("title", {
                initialValue:
                  props.status === "update" ? props.article.title : "",
                rules: [{ required: true, message: "请输入文章标题" }],
              })(<Input placeholder="标题，例：浅论基尔霍夫定律" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label={
                <span>
                  作者 Author&nbsp;
                  <Tooltip title="这篇文章的实际作者的用户名">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              hasFeedback
              // 需要加入检验用户是否存在的功能
            >
              {form.getFieldDecorator("author", {
                initialValue:
                  props.status === "update" ? props.article.author : "",
                rules: [{ required: true, message: "请输入作者的用户名" }],
              })(<Input placeholder="作者的用户名" />)}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={32}>
          <Col span={16}>
            <Form.Item
              label={
                <span>
                  别名 Alias&nbsp;
                  <Tooltip title="这篇文章的别名，将用于文章链接">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              hasFeedback
            >
              {form.getFieldDecorator("alias", {
                initialValue:
                  props.status === "update" ? props.article.alias : "",
                rules: [
                  { required: true, message: "请输入文章别名" },
                  { validator: validateAlias },
                ],
              })(
                <Input placeholder="英文标题，字母小写且用横杠连接，例：tensorflow-first-look" />
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="标签">
              {form.getFieldDecorator("tags", { initialValue: tags })(
                <Tags value={tags} onChange={onTagsChange} />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
);

interface IButtomInfoFormProps extends FormComponentProps {
  props: IArticleEditPageProps;
  coverImage: UploadFile[];
  onCoverImageChange: (fileList: UploadFile[]) => void;
  onCoverImageRemove: (file: UploadFile) => Promise<boolean>;
  onImgManageClick: () => void;
  onSubmit: () => void;
}

const ButtomInfoForm = forwardRef<FormComponentProps, IButtomInfoFormProps>(
  (
    {
      form,
      props,
      coverImage,
      onCoverImageChange,
      onCoverImageRemove,
      onImgManageClick,
      onSubmit,
    }: IButtomInfoFormProps,
    ref
  ) => {
    useImperativeHandle(ref, () => ({ form }));

    const { TextArea } = Input;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form
        style={{ boxSizing: "border-box" }}
        layout="vertical"
        {...formItemLayout}
      >
        <Row gutter={40} type="flex" justify="space-between">
          <Col span={8}>
            <Form.Item
              label={
                <span>
                  摘要 Abstract&nbsp;
                  <Tooltip title="这篇文章的摘要，将用于主页面的展示">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              {form.getFieldDecorator("abstract", {
                initialValue:
                  props.status === "update" ? props.article.abstract : "",
              })(<TextArea autoSize={{ minRows: 4 }} placeholder="文章摘要" />)}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item label="封面" required>
              <MultipleUpload
                maxUpload={1}
                token={props.token}
                fileList={coverImage}
                onFileListChange={onCoverImageChange}
                onRemove={onCoverImageRemove}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Button icon="picture" onClick={onImgManageClick}>
              图片管理
            </Button>
          </Col>
          <Col span={6}></Col>

          <Col span={3} style={{ paddingRight: "0" }}>
            <Button type="primary" icon="upload" onClick={onSubmit}>
              {props.article.id === 0 ? `发布文章` : `更新文章`}
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
);

const WrappedTopInfoForm = Form.create<ITopInfoFormProps>()(TopInfoForm);

const WrappedButtomInfoForm = Form.create<IButtomInfoFormProps>()(
  ButtomInfoForm
);
