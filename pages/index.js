//React Components
import React, { useState } from "react";

//Next Components
import Image from 'next/image'

//MaterialUI Components
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

//MaterialUI Icons
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

//AWS SDK
import AWS from 'aws-sdk';
import ServiceQuotas from "aws-sdk/clients/servicequotas";

//Need Further Investigation
//var ProxyAgent = require('proxy-agent');
var ProxyAgent //This is a placeholder DO NOT USE!

export default function App() {
  //environments
  const defaultRemote = process.env.NEXT_PUBLIC_DEFAULT_REMOTE || "/api";

  const regions = ["us-east-2", "us-east-1", "us-west-1", "us-west-2", "af-south-1", "ap-east-1", "ap-southeast-3", "ap-south-1", "ap-northeast-3", "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2", "eu-south-1", "eu-west-3", "eu-north-1", "me-south-1", "sa-east-1"]
  const regionsDetail = ["US East (Ohio)", "US East (N. Virginia)", "US West (N. California)", "US West (Oregon)", "Africa (Cape Town)", "Asia Pacific (Hong Kong)", "Asia Pacific (Jakarta)", "Asia Pacific (Mumbai)", "Asia Pacific (Osaka)", "Asia Pacific (Seoul)", "Asia Pacific (Singapore)", "Asia Pacific (Sydney)", "Asia Pacific (Tokyo)", "Canada (Central)", "Europe (Frankfurt)", "Europe (Ireland)", "Europe (London)", "Europe (Milan)", "Europe (Paris)", "Europe (Stockholm)", "Middle East (Bahrain)", "South America (São Paulo)"]
  const states = new Map([[0, "正在启动"], [16, "正在运行"], [32, "正在关机"], [48, "已终止"], [64, "正在停止"], [80, "已停止"]]);
  const systems = ["Debian 10", "Debian 11", "Ubuntu 20.04", "Ubuntu 22.04", "Arch Linux"]
  const types = ["a1.medium", "a1.large", "a1.xlarge", "a1.2xlarge", "a1.4xlarge", "a1.metal", "c1.medium", "c1.xlarge", "c3.large", "c3.xlarge", "c3.2xlarge", "c3.4xlarge", "c3.8xlarge", "c4.large", "c4.xlarge", "c4.2xlarge", "c4.4xlarge", "c4.8xlarge", "c5.large", "c5.xlarge", "c5.2xlarge", "c5.4xlarge", "c5.9xlarge", "c5.12xlarge", "c5.18xlarge", "c5.24xlarge", "c5.metal", "c5a.large", "c5a.xlarge", "c5a.2xlarge", "c5a.4xlarge", "c5a.8xlarge", "c5a.12xlarge", "c5a.16xlarge", "c5a.24xlarge", "c5ad.large", "c5ad.xlarge", "c5ad.2xlarge", "c5ad.4xlarge", "c5ad.8xlarge", "c5ad.12xlarge", "c5ad.16xlarge", "c5ad.24xlarge", "c5d.large", "c5d.xlarge", "c5d.2xlarge", "c5d.4xlarge", "c5d.9xlarge", "c5d.12xlarge", "c5d.18xlarge", "c5d.24xlarge", "c5d.metal", "c5n.large", "c5n.xlarge", "c5n.2xlarge", "c5n.4xlarge", "c5n.9xlarge", "c5n.18xlarge", "c5n.metal", "c6g.medium", "c6g.large", "c6g.xlarge", "c6g.2xlarge", "c6g.4xlarge", "c6g.8xlarge", "c6g.12xlarge", "c6g.16xlarge", "c6g.metal", "c6gd.medium", "c6gd.large", "c6gd.xlarge", "c6gd.2xlarge", "c6gd.4xlarge", "c6gd.8xlarge", "c6gd.12xlarge", "c6gd.16xlarge", "c6gd.metal", "c6gn.medium", "c6gn.large", "c6gn.xlarge", "c6gn.2xlarge", "c6gn.4xlarge", "c6gn.8xlarge", "c6gn.12xlarge", "c6gn.16xlarge", "c6i.large", "c6i.xlarge", "c6i.2xlarge", "c6i.4xlarge", "c6i.8xlarge", "c6i.12xlarge", "c6i.16xlarge", "c6i.24xlarge", "c6i.32xlarge", "c6i.metal", "cc1.4xlarge", "cc2.8xlarge", "cg1.4xlarge", "cr1.8xlarge", "d2.xlarge", "d2.2xlarge", "d2.4xlarge", "d2.8xlarge", "d3.xlarge", "d3.2xlarge", "d3.4xlarge", "d3.8xlarge", "d3en.xlarge", "d3en.2xlarge", "d3en.4xlarge", "d3en.6xlarge", "d3en.8xlarge", "d3en.12xlarge", "dl1.24xlarge", "f1.2xlarge", "f1.4xlarge", "f1.16xlarge", "g2.2xlarge", "g2.8xlarge", "g3.4xlarge", "g3.8xlarge", "g3.16xlarge", "g3s.xlarge", "g4ad.xlarge", "g4ad.2xlarge", "g4ad.4xlarge", "g4ad.8xlarge", "g4ad.16xlarge", "g4dn.xlarge", "g4dn.2xlarge", "g4dn.4xlarge", "g4dn.8xlarge", "g4dn.12xlarge", "g4dn.16xlarge", "g4dn.metal", "g5.xlarge", "g5.2xlarge", "g5.4xlarge", "g5.8xlarge", "g5.12xlarge", "g5.16xlarge", "g5.24xlarge", "g5.48xlarge", "g5g.xlarge", "g5g.2xlarge", "g5g.4xlarge", "g5g.8xlarge", "g5g.16xlarge", "g5g.metal", "hi1.4xlarge", "hpc6a.48xlarge", "hs1.8xlarge", "h1.2xlarge", "h1.4xlarge", "h1.8xlarge", "h1.16xlarge", "i2.xlarge", "i2.2xlarge", "i2.4xlarge", "i2.8xlarge", "i3.large", "i3.xlarge", "i3.2xlarge", "i3.4xlarge", "i3.8xlarge", "i3.16xlarge", "i3.metal", "i3en.large", "i3en.xlarge", "i3en.2xlarge", "i3en.3xlarge", "i3en.6xlarge", "i3en.12xlarge", "i3en.24xlarge", "i3en.metal", "im4gn.large", "im4gn.xlarge", "im4gn.2xlarge", "im4gn.4xlarge", "im4gn.8xlarge", "im4gn.16xlarge", "inf1.xlarge", "inf1.2xlarge", "inf1.6xlarge", "inf1.24xlarge", "is4gen.medium", "is4gen.large", "is4gen.xlarge", "is4gen.2xlarge", "is4gen.4xlarge", "is4gen.8xlarge", "m1.small", "m1.medium", "m1.large", "m1.xlarge", "m2.xlarge", "m2.2xlarge", "m2.4xlarge", "m3.medium", "m3.large", "m3.xlarge", "m3.2xlarge", "m4.large", "m4.xlarge", "m4.2xlarge", "m4.4xlarge", "m4.10xlarge", "m4.16xlarge", "m5.large", "m5.xlarge", "m5.2xlarge", "m5.4xlarge", "m5.8xlarge", "m5.12xlarge", "m5.16xlarge", "m5.24xlarge", "m5.metal", "m5a.large", "m5a.xlarge", "m5a.2xlarge", "m5a.4xlarge", "m5a.8xlarge", "m5a.12xlarge", "m5a.16xlarge", "m5a.24xlarge", "m5ad.large", "m5ad.xlarge", "m5ad.2xlarge", "m5ad.4xlarge", "m5ad.8xlarge", "m5ad.12xlarge", "m5ad.16xlarge", "m5ad.24xlarge", "m5d.large", "m5d.xlarge", "m5d.2xlarge", "m5d.4xlarge", "m5d.8xlarge", "m5d.12xlarge", "m5d.16xlarge", "m5d.24xlarge", "m5d.metal", "m5dn.large", "m5dn.xlarge", "m5dn.2xlarge", "m5dn.4xlarge", "m5dn.8xlarge", "m5dn.12xlarge", "m5dn.16xlarge", "m5dn.24xlarge", "m5dn.metal", "m5n.large", "m5n.xlarge", "m5n.2xlarge", "m5n.4xlarge", "m5n.8xlarge", "m5n.12xlarge", "m5n.16xlarge", "m5n.24xlarge", "m5n.metal", "m5zn.large", "m5zn.xlarge", "m5zn.2xlarge", "m5zn.3xlarge", "m5zn.6xlarge", "m5zn.12xlarge", "m5zn.metal", "m6a.large", "m6a.xlarge", "m6a.2xlarge", "m6a.4xlarge", "m6a.8xlarge", "m6a.12xlarge", "m6a.16xlarge", "m6a.24xlarge", "m6a.32xlarge", "m6a.48xlarge", "m6g.metal", "m6g.medium", "m6g.large", "m6g.xlarge", "m6g.2xlarge", "m6g.4xlarge", "m6g.8xlarge", "m6g.12xlarge", "m6g.16xlarge", "m6gd.metal", "m6gd.medium", "m6gd.large", "m6gd.xlarge", "m6gd.2xlarge", "m6gd.4xlarge", "m6gd.8xlarge", "m6gd.12xlarge", "m6gd.16xlarge", "m6i.large", "m6i.xlarge", "m6i.2xlarge", "m6i.4xlarge", "m6i.8xlarge", "m6i.12xlarge", "m6i.16xlarge", "m6i.24xlarge", "m6i.32xlarge", "m6i.metal", "mac1.metal", "p2.xlarge", "p2.8xlarge", "p2.16xlarge", "p3.2xlarge", "p3.8xlarge", "p3.16xlarge", "p3dn.24xlarge", "p4d.24xlarge", "r3.large", "r3.xlarge", "r3.2xlarge", "r3.4xlarge", "r3.8xlarge", "r4.large", "r4.xlarge", "r4.2xlarge", "r4.4xlarge", "r4.8xlarge", "r4.16xlarge", "r5.large", "r5.xlarge", "r5.2xlarge", "r5.4xlarge", "r5.8xlarge", "r5.12xlarge", "r5.16xlarge", "r5.24xlarge", "r5.metal", "r5a.large", "r5a.xlarge", "r5a.2xlarge", "r5a.4xlarge", "r5a.8xlarge", "r5a.12xlarge", "r5a.16xlarge", "r5a.24xlarge", "r5ad.large", "r5ad.xlarge", "r5ad.2xlarge", "r5ad.4xlarge", "r5ad.8xlarge", "r5ad.12xlarge", "r5ad.16xlarge", "r5ad.24xlarge", "r5b.large", "r5b.xlarge", "r5b.2xlarge", "r5b.4xlarge", "r5b.8xlarge", "r5b.12xlarge", "r5b.16xlarge", "r5b.24xlarge", "r5b.metal", "r5d.large", "r5d.xlarge", "r5d.2xlarge", "r5d.4xlarge", "r5d.8xlarge", "r5d.12xlarge", "r5d.16xlarge", "r5d.24xlarge", "r5d.metal", "r5dn.large", "r5dn.xlarge", "r5dn.2xlarge", "r5dn.4xlarge", "r5dn.8xlarge", "r5dn.12xlarge", "r5dn.16xlarge", "r5dn.24xlarge", "r5dn.metal", "r5n.large", "r5n.xlarge", "r5n.2xlarge", "r5n.4xlarge", "r5n.8xlarge", "r5n.12xlarge", "r5n.16xlarge", "r5n.24xlarge", "r5n.metal", "r6g.medium", "r6g.large", "r6g.xlarge", "r6g.2xlarge", "r6g.4xlarge", "r6g.8xlarge", "r6g.12xlarge", "r6g.16xlarge", "r6g.metal", "r6gd.medium", "r6gd.large", "r6gd.xlarge", "r6gd.2xlarge", "r6gd.4xlarge", "r6gd.8xlarge", "r6gd.12xlarge", "r6gd.16xlarge", "r6gd.metal", "r6i.large", "r6i.xlarge", "r6i.2xlarge", "r6i.4xlarge", "r6i.8xlarge", "r6i.12xlarge", "r6i.16xlarge", "r6i.24xlarge", "r6i.32xlarge", "r6i.metal", "t1.micro", "t2.nano", "t2.micro", "t2.small", "t2.medium", "t2.large", "t2.xlarge", "t2.2xlarge", "t3.nano", "t3.micro", "t3.small", "t3.medium", "t3.large", "t3.xlarge", "t3.2xlarge", "t3a.nano", "t3a.micro", "t3a.small", "t3a.medium", "t3a.large", "t3a.xlarge", "t3a.2xlarge", "t4g.nano", "t4g.micro", "t4g.small", "t4g.medium", "t4g.large", "t4g.xlarge", "t4g.2xlarge", "u-6tb1.56xlarge", "u-6tb1.112xlarge", "u-9tb1.112xlarge", "u-12tb1.112xlarge", "u-6tb1.metal", "u-9tb1.metal", "u-12tb1.metal", "u-18tb1.metal", "u-24tb1.metal", "vt1.3xlarge", "vt1.6xlarge", "vt1.24xlarge", "x1.16xlarge", "x1.32xlarge", "x1e.xlarge", "x1e.2xlarge", "x1e.4xlarge", "x1e.8xlarge", "x1e.16xlarge", "x1e.32xlarge", "x2iezn.2xlarge", "x2iezn.4xlarge", "x2iezn.6xlarge", "x2iezn.8xlarge", "x2iezn.12xlarge", "x2iezn.metal", "x2gd.medium", "x2gd.large", "x2gd.xlarge", "x2gd.2xlarge", "x2gd.4xlarge", "x2gd.8xlarge", "x2gd.12xlarge", "x2gd.16xlarge", "x2gd.metal", "z1d.large", "z1d.xlarge", "z1d.2xlarge", "z1d.3xlarge", "z1d.6xlarge", "z1d.12xlarge", "z1d.metal", "x2idn.16xlarge", "x2idn.24xlarge", "x2idn.32xlarge", "x2iedn.xlarge", "x2iedn.2xlarge", "x2iedn.4xlarge", "x2iedn.8xlarge", "x2iedn.16xlarge", "x2iedn.24xlarge", "x2iedn.32xlarge", "c6a.large", "c6a.xlarge", "c6a.2xlarge", "c6a.4xlarge", "c6a.8xlarge", "c6a.12xlarge", "c6a.16xlarge", "c6a.24xlarge", "c6a.32xlarge", "c6a.48xlarge", "c6a.metal", "m6a.metal", "i4i.large", "i4i.xlarge", "i4i.2xlarge", "i4i.4xlarge", "i4i.8xlarge", "i4i.16xlarge", "i4i.32xlarge", "i4i.metal", "x2idn.metal", "x2iedn.metal", "c7g.medium", "c7g.large", "c7g.xlarge", "c7g.2xlarge", "c7g.4xlarge", "c7g.8xlarge", "c7g.12xlarge", "c7g.16xlarge", "mac2.metal", "c6id.large", "c6id.xlarge", "c6id.2xlarge", "c6id.4xlarge", "c6id.8xlarge", "c6id.12xlarge", "c6id.16xlarge", "c6id.24xlarge", "c6id.32xlarge", "c6id.metal", "m6id.large", "m6id.xlarge", "m6id.2xlarge", "m6id.4xlarge", "m6id.8xlarge", "m6id.12xlarge", "m6id.16xlarge", "m6id.24xlarge", "m6id.32xlarge", "m6id.metal", "r6id.large", "r6id.xlarge", "r6id.2xlarge", "r6id.4xlarge", "r6id.8xlarge", "r6id.12xlarge", "r6id.16xlarge", "r6id.24xlarge", "r6id.32xlarge", "r6id.metal", "r6a.large", "r6a.xlarge", "r6a.2xlarge", "r6a.4xlarge", "r6a.8xlarge", "r6a.12xlarge", "r6a.16xlarge", "r6a.24xlarge", "r6a.32xlarge", "r6a.48xlarge", "r6a.metal", "p4de.24xlarge"]

  //Credential States
  const [aki, setAki] = useState("");
  const [saki, setSaki] = useState("");

  //Mode States
  const [mode, setMode] = useState(1);
  const [remote, setRemote] = useState(defaultRemote);
  const [proxy, setProxy] = useState("");

  //Configuration States
  const [liRegion, setLiRegion] = useState("");
  const [system, setSystem] = useState("");
  const [type, setType] = useState("");
  const [ami, setAmi] = useState("");
  const [password, setPassword] = useState("");
  const [diskSize, setDiskSize] = useState(8);
  const [userdata, setUserdata] = useState("")
  const [gqRegion, setGqRegion] = useState("");
  const [ciRegion, setCiRegion] = useState("");

  //Interaction States
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertDescription, setAlertDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [modeTipOpen, setModeTipOpen] = useState(false);

  //Status States
  const [ipInfomation, setIpInfomation] = useState("");
  const [isLaunchingInstance, setIsLaunchingInstance] = useState(false);
  const [isGettingQuota, setIsGettingQuota] = useState(false);
  const [isCheckingInstances, setIsCheckingInstances] = useState(false);
  const [isCheckedInstances, setIsCheckedInstances] = useState(false);
  const [regionOfCheckedInstances, setRegionOfCheckedInstances] = useState("");
  const [idOfInstanceChangingIp, setIdOfInstanceChangingIp] = useState("");
  const [idOfInstanceTerminating, setIdOfInstanceTerminating] = useState("");
  const [isShowAdvancedOptions, setIsShowAdvancedOptions] = useState(false);

  //Data States
  const [instances, setInstances] = useState([]);

  //Interactions
  function showAlert(title, description) {
    setAlertOpen(true);
    setAlertTitle(title);
    setAlertDescription(description);
  }

  function showDialog(title, description) {
    setDialogOpen(true);
    setDialogTitle(title);
    setDialogDescription(description);
  }

  //Validations
  function validateRemote() {
    if (remote === "/api") {
      return TextTrackCueList;
    }
    var validRemoteTemplate = /^(http|https?:\/\/)/;
    return validRemoteTemplate.test(remote);
  }

  function validateProxy() {
    var validProxyTemplate = /^(http|https|socks|socks(4|5)|pac?:\/\/)/;
    return validProxyTemplate.test(proxy);
  }

  //Operations
  function launchInstance() {
    setIsLaunchingInstance(true);
    if (aki.length !== 20 || saki.length !== 40) {
      showDialog("无效凭证", "请检查凭证格式是否正确");
      setIsLaunchingInstance(false);
      return;
    }
    if (liRegion === "") {
      showDialog("选择地区", "请选择地区后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if (!isShowAdvancedOptions && system === "") {
      showDialog("选择操作系统", "请选择操作系统后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if (type === "") {
      showDialog("选择实例类型", "请选择实例类型后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if (password.length < 6) {
      showDialog("无效密码", "请输入6位以上密码后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if ((mode === 2 || mode === 3 || mode === 4) && !validateRemote()) {
      showDialog("无效远端地址", "远端地址格式不正确，请修改后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if ((mode === 3 || mode === 4) && !validateProxy()) {
      showDialog("无效代理地址", "代理地址格式不正确，请修改后再试一次");
      setIsLaunchingInstance(false);
      return;
    }
    if (mode === 1 || mode === 3) {
      AWS.config = new AWS.Config();
      AWS.config.update(
        {
          accessKeyId: aki,
          secretAccessKey: saki,
          region: liRegion
        }
      );
      if (mode === 3) {
        AWS.config.update({
          httpOptions: { agent: ProxyAgent(proxy) }
        });
      }
      var ec2 = new AWS.EC2();

      var imageId = ''
      if (ami != "") {
        imageId = ami;
      }
      else {
        var imageName = ''
        var imageOwner = ''
        if (system === 'Debian 10') {
          imageName = 'debian-10-amd64-2022*';
          imageOwner = '136693071363';
        }
        if (system === 'Debian 11') {
          imageName = 'debian-11-amd64-2022*';
          imageOwner = '136693071363';
        }
        if (system === 'Ubuntu 20.04') {
          imageName = 'ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-2022*';
          imageOwner = '099720109477';
        }
        if (system === 'Ubuntu 22.04') {
          imageName = 'ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-2022*';
          imageOwner = '099720109477';
        }
        if (system === 'Arch Linux') {
          imageName = '*';
          imageOwner = '647457786197';
        }

        var imageParams = {
          Filters: [
            {
              Name: 'name',
              Values: [
                imageName
              ]
            },
            {
              Name: 'architecture',
              Values: [
                'x86_64'
              ]
            }
          ],
          Owners: [
            imageOwner
          ]
        }
        ec2.describeImages(imageParams, function (err, data) {
          if (err) {
            showDialog("启动实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
            setIsLaunchingInstance(false);
            return;
          }
          else {
            imageId = data.Images[0].ImageId
          }
        });
      }

      var keyName = String(Date.now())
      var keyParams = {
        KeyName: keyName
      };
      ec2.createKeyPair(keyParams, function (err, data) {
        if (err) {
          showDialog("启动实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIsLaunchingInstance(false);
          return;
        }
      });

      var groupId = ''
      var sgParams = {
        Description: keyName,
        GroupName: keyName
      }
      ec2.createSecurityGroup(sgParams, function (err, data) {
        if (err) {
          showDialog("启动实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIsLaunchingInstance(false);
          return;
        } else {
          groupId = data.GroupId

          var asgParams = {
            GroupId: groupId,
            IpPermissions: [
              {
                FromPort: 0,
                IpProtocol: "tcp",
                IpRanges: [
                  {
                    CidrIp: "0.0.0.0/0",
                    Description: "All TCP"
                  }
                ],
                ToPort: 65535
              },
              {
                FromPort: 0,
                IpProtocol: "udp",
                IpRanges: [
                  {
                    CidrIp: "0.0.0.0/0",
                    Description: "All UDP"
                  }
                ],
                ToPort: 65535
              },
              {
                FromPort: -1,
                IpProtocol: "icmp",
                IpRanges: [
                  {
                    CidrIp: "0.0.0.0/0",
                    Description: "All ICMP"
                  }
                ],
                ToPort: -1
              },
              {
                FromPort: -1,
                IpProtocol: "icmpv6",
                IpRanges: [
                  {
                    CidrIp: "0.0.0.0/0",
                    Description: "All ICMPV6"
                  }
                ],
                ToPort: -1
              }
            ]
          };
          ec2.authorizeSecurityGroupIngress(asgParams, function (err, data) {
            if (err) {
              showDialog("启动实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
              console.log(err);
              setIsLaunchingInstance(false);
              return;
            } else {

              var userDataRaw = "#!/bin/bash\necho root:" + password + "|sudo chpasswd root\nsudo rm -rf /etc/ssh/sshd_config\nsudo tee /etc/ssh/sshd_config <<EOF\nClientAliveInterval 120\nSubsystem       sftp    /usr/lib/openssh/sftp-server\nX11Forwarding yes\nPrintMotd no\nChallengeResponseAuthentication no\nPasswordAuthentication yes\nPermitRootLogin yes\nUsePAM yes\nAcceptEnv LANG LC_*\nEOF\nsudo systemctl restart sshd\n" + userdata
              var userData = btoa(userDataRaw)
              var instanceParams = {
                BlockDeviceMappings: [
                  {
                    DeviceName: "/dev/xvda",
                    Ebs: {
                      VolumeSize: diskSize
                    }
                  }
                ],
                ImageId: imageId,
                InstanceType: type,
                KeyName: keyName,
                MinCount: 1,
                MaxCount: 1,
                SecurityGroupIds: [
                  groupId
                ],
                UserData: userData
              };
              ec2.runInstances(instanceParams, function (err, data) {
                if (err) {
                  showDialog("启动实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
                  setIsLaunchingInstance(false);
                } else {
                  showAlert("启动实例成功", "您的新实例id为" + data.Instances[0].InstanceId + "，请通过查询实例详细信息获得公网ip");
                  setIsLaunchingInstance(false);
                  setInstances([]);
                }
              });

            }
          });

        }
      });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: liRegion,
          system: system,
          type: type,
          password: password,
          useProxy: false
        })
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: liRegion,
          system: system,
          type: type,
          password: password,
          useProxy: true,
          proxy: proxy
        })
      }
      fetch(remote + '/aws-launch-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            showAlert("启动实例成功", "您的新实例id为" + body.instanceId + "，请通过查询实例详细信息获得公网ip");
            setIsLaunchingInstance(false);
            setInstances([]);
          }
          else {
            showDialog("启动实例失败：" + body.error.name, "错误：" + body.error.message + " 请再试一次或联系支持");
            setIsLaunchingInstance(false);
          }
        });
    }
  }

  function getQuota() {
    setIsGettingQuota(true);
    if (aki.length !== 20 || saki.length !== 40) {
      showDialog("无效凭证", "请检查凭证格式是否正确");
      setIsGettingQuota(false);
      return;
    }
    if (gqRegion === "") {
      showDialog("选择地区", "请选择地区后再试一次");
      setIsGettingQuota(false);
      return;
    }
    if ((mode === 2 || mode === 3 || mode === 4) && !validateRemote()) {
      showDialog("无效远端地址", "远端地址格式不正确，请修改后再试一次");
      setIsGettingQuota(false);
      return;
    }
    if ((mode === 3 || mode === 4) && !validateProxy()) {
      showDialog("无效代理地址", "代理地址格式不正确，请修改后再试一次");
      setIsGettingQuota(false);
      return;
    }
    if (mode === 1 || mode === 3) {
      AWS.config = new AWS.Config();
      AWS.config.update(
        {
          accessKeyId: aki,
          secretAccessKey: saki,
          region: gqRegion
        }
      );
      if (mode === 3) {
        AWS.config.update({
          httpOptions: { agent: ProxyAgent(proxy) }
        });
      }
      var servicequotas = new AWS.ServiceQuotas();
      var params = {
        QuotaCode: 'L-1216C47A',
        ServiceCode: 'ec2'
      };
      servicequotas.getServiceQuota(params, function (err, data) {
        if (err) {
          showDialog("查看配额失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIsGettingQuota(false);
        }
        else {
          showAlert("查看配额成功", "您在该区域的配额为" + String(data.Quota.Value));
          setIsGettingQuota(false);
        }
      });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: gqRegion,
          useProxy: false
        });
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: gqRegion,
          useProxy: true,
          proxy: proxy
        });
      }
      fetch(remote + '/aws-get-quota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            showAlert("查看配额成功", "您在该区域的配额为" + String(body.quota));
            setIsGettingQuota(false);
          }
          else {
            showDialog("查看配额失败：" + body.error.name, "错误：" + body.error.message + " 请再试一次或联系支持");
            setIsGettingQuota(false);
          }
        });
    }
  }

  function checkInstances(noSuccessAlert) {
    setIsCheckingInstances(true);
    setIsCheckedInstances(false);
    setRegionOfCheckedInstances("");
    if (aki.length !== 20 || saki.length !== 40) {
      showDialog("无效凭证", "请检查凭证格式是否正确");
      setIsCheckingInstances(false);
      return;
    }
    if (ciRegion === "") {
      showDialog("选择地区", "请选择地区后再试一次");
      setIsCheckingInstances(false);
      return;
    }
    if ((mode === 2 || mode === 3 || mode === 4) && !validateRemote()) {
      showDialog("无效远端地址", "远端地址格式不正确，请修改后再试一次");
      setIsCheckingInstances(false);
      return;
    }
    if ((mode === 3 || mode === 4) && !validateProxy()) {
      showDialog("无效代理地址", "代理地址格式不正确，请修改后再试一次");
      setIsCheckingInstances(false);
      return;
    }
    if (mode === 1 || mode === 3) {
      AWS.config = new AWS.Config();
      AWS.config.update(
        {
          accessKeyId: aki,
          secretAccessKey: saki,
          region: ciRegion
        }
      );
      if (mode === 3) {
        AWS.config.update({
          httpOptions: { agent: ProxyAgent(proxy) }
        });
      }
      var ec2 = new AWS.EC2();
      var params = {}
      ec2.describeInstances(params, function (err, data) {
        if (err) {
          showDialog("查看实例详细信息失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIsCheckingInstances(false);
        }
        else {
          var processedInstances = []
          data.Reservations.forEach(reservation => {
            reservation.Instances.forEach(instance => {
              processedInstances.push({ id: instance.InstanceId, state: instance.State.Code, type: instance.InstanceType, ip: instance.PublicIpAddress, platform: instance.PlatformDetails })
            })
          })
          setInstances(processedInstances);
          if (!noSuccessAlert) {
            showAlert("查看实例详细信息成功", "请在查看实例详细信息选项卡中查看您在该区域的实例信息");
          }
          setIsCheckingInstances(false);
          setIsCheckedInstances(true);
          setRegionOfCheckedInstances(ciRegion);
        }
      });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: ciRegion,
          useProxy: false
        });
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: ciRegion,
          useProxy: true,
          proxy: proxy
        });
      }
      fetch(remote + '/aws-check-instances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            setInstances(body.instances);
            if (!noSuccessAlert) {
              showAlert("查看实例详细信息成功", "请在查看实例详细信息选项卡中查看您在该区域的实例信息");
            }
            setIsCheckingInstances(false);
            setIsCheckedInstances(true);
            setRegionOfCheckedInstances(ciRegion);
          }
          else {
            showDialog("查看实例详细信息失败：" + body.error.name, "错误：" + body.error.message + " 请再试一次或联系支持");
            setIsCheckingInstances(false);
          }
        });
    }
  }

  function changeInstanceIp(id) {
    setIdOfInstanceChangingIp(id);
    if (aki.length !== 20 || saki.length !== 40) {
      showDialog("无效凭证", "请检查凭证格式是否正确");
      setIdOfInstanceChangingIp("");
      return;
    }
    if ((mode === 2 || mode === 3 || mode === 4) && !validateRemote()) {
      showDialog("无效远端地址", "远端地址格式不正确，请修改后再试一次");
      setIdOfInstanceChangingIp("");
      return;
    }
    if ((mode === 3 || mode === 4) && !validateProxy()) {
      showDialog("无效代理地址", "代理地址格式不正确，请修改后再试一次");
      setIdOfInstanceChangingIp("");
      return;
    }
    if (mode === 1 || mode === 3) {
      AWS.config = new AWS.Config();
      AWS.config.update(
        {
          accessKeyId: aki,
          secretAccessKey: saki,
          region: regionOfCheckedInstances
        }
      );
      if (mode === 3) {
        AWS.config.update({
          httpOptions: { agent: ProxyAgent(proxy) }
        });
      }
      var ec2 = new AWS.EC2();
      var allocateParams = {
        Domain: "vpc"
      };
      ec2.allocateAddress(allocateParams, function (err, data) {
        if (err) {
          showDialog("更换实例ip失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIdOfInstanceChangingIp("");
        }
        else {
          var newAllocationId = data.AllocationId;
          var associateParams = {
            AllocationId: newAllocationId,
            InstanceId: id,
          };
          ec2.associateAddress(associateParams, function (err, data) {
            if (err) {
              showDialog("更换实例ip失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
              setIdOfInstanceChangingIp("");
            }
            else {
              var disassociateParams = {
                AssociationId: data.AssociationId
              };
              ec2.disassociateAddress(disassociateParams, function (err, data) {
                if (err) {
                  showDialog("更换实例ip失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
                  setIdOfInstanceChangingIp("");
                }
                else {
                  var releaseParams = {
                    AllocationId: newAllocationId
                  };
                  ec2.releaseAddress(releaseParams, function (err, data) {
                    if (err) {
                      showDialog("更换实例ip失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
                      setIdOfInstanceChangingIp("");
                    }
                    else {
                      setIdOfInstanceChangingIp("");
                      showAlert("更换实例ip成功", "请在实例详细信息查看新ip");
                      checkInstances(true);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: regionOfCheckedInstances,
          instanceId: id,
          useProxy: false
        });
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: regionOfCheckedInstances,
          instanceId: id,
          useProxy: true,
          proxy: proxy
        });
      }
      fetch(remote + '/aws-change-instance-ip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            showAlert("更换实例ip成功", "请在实例详细信息查看新ip");
            setIdOfInstanceChangingIp("");
            checkInstances(true);
          }
          else {
            showDialog("更换实例ip失败：" + body.err.name, "错误：" + body.err.message + " 请再试一次或联系支持");
            setIdOfInstanceChangingIp("");
          }
        });
    }
  }

  function terminateInstance(id) {
    setIdOfInstanceTerminating(id);
    if (aki.length !== 20 || saki.length !== 40) {
      showDialog("无效凭证", "请检查凭证格式是否正确");
      setIdOfInstanceTerminating("");
      return;
    }
    if ((mode === 2 || mode === 3 || mode === 4) && !validateRemote()) {
      showDialog("无效远端地址", "远端地址格式不正确，请修改后再试一次");
      setIdOfInstanceTerminating("");
      return;
    }
    if ((mode === 3 || mode === 4) && !validateProxy()) {
      showDialog("无效代理地址", "代理地址格式不正确，请修改后再试一次");
      setIdOfInstanceTerminating("");
      return;
    }
    if (mode === 1 || mode === 3) {
      AWS.config = new AWS.Config();
      AWS.config.update(
        {
          accessKeyId: aki,
          secretAccessKey: saki,
          region: regionOfCheckedInstances
        }
      );
      if (mode === 3) {
        AWS.config.update({
          httpOptions: { agent: ProxyAgent(proxy) }
        });
      }
      var ec2 = new AWS.EC2();
      var params = {
        InstanceIds: [
          id
        ]
      };
      ec2.terminateInstances(params, function (err, data) {
        if (err) {
          showDialog("终止实例失败：" + err.name, "错误：" + err.message + " 请再试一次或联系支持");
          setIdOfInstanceTerminating("");
        }
        else {
          showAlert("终止实例成功", "实例将在不久后被删除，在此之前它会保留在列表一段时间");
          setIdOfInstanceTerminating("");
          checkInstances(true);
        }
      });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: regionOfCheckedInstances,
          instanceId: id,
          useProxy: false
        });
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          aki: aki,
          saki: saki,
          region: regionOfCheckedInstances,
          instanceId: id,
          useProxy: true,
          proxy: proxy
        });
      }
      fetch(remote + '/aws-terminate-instance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            showAlert("终止实例成功", "实例将在不久后被删除，在此之前它会保留在列表一段时间");
            setIdOfInstanceTerminating("");
            checkInstances(true);
          }
          else {
            showDialog("终止实例失败：" + body.err.name, "错误：" + body.err.message + "，请再试一次或联系支持");
            setIdOfInstanceTerminating("");
          }
        });
    }
  }

  function getIp() {
    if (mode === 1 || mode === 3) {
      if (mode === 3) {
        //Use proxy
        //Need Further Investigation
      }
      fetch('https://api.ipify.org?format=json', {
        method: 'GET'
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            setIpInfomation("此模式下的IP为： " + body.ip);
          }
          else {
            setIpInfomation("无法获取IP信息");
          }
        });
    }
    else if (mode === 2 || mode === 4) {
      var postBody
      if (mode === 2) {
        postBody = JSON.stringify({});
      }
      else if (mode === 4) {
        postBody = JSON.stringify({
          useProxy: true,
          proxy: proxy
        });
      }
      fetch(remote + '/get-ip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: postBody
      })
        .then(async (response) => {
          var body = await response.json();
          if (response.ok) {
            setIpInfomation("此模式下的IP为： " + body.ip);
          }
          else {
            setIpInfomation("无法获取IP信息");
          }
        });
    }
  }

  return (
    <div className="App">
      <div>
        <Typography id="main-title" sx={{ m: 2 }} variant="h4">Shizuku Launcher - AWS开机小助手</Typography>
      </div>
      <div>
        <Stack sx={{ m: 2 }} spacing={2} direction="row">
          <Link underline="hover" variant="body2" href="https://github.com/hiDandelion/shizuku-launcher-next">访问项目仓库</Link>
        </Stack>
      </div>
      <div>
        <Image src="/title-shizuku.webp" alt="title-shizuku" width={256} height={256} />
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }} variant="standard">
          <TextField label="Access Key ID" variant="outlined" size="small" onChange={(e) => {
            setAki(e.target.value);
            setIsCheckedInstances(false);
          }} />
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }}>
          <TextField label="Secret Access Key ID" variant="outlined" size="small" onChange={(e) => {
            setSaki(e.target.value);
            setIsCheckedInstances(false);
          }} />
        </FormControl>
      </div>
      <div>
        <Collapse in={modeTipOpen}>
          <Alert severity="info" onClose={() => { setModeTipOpen(false) }}>
            <AlertTitle>运行模式帮助</AlertTitle>
            <div>本地模式：所有操作均在本地完成，凭证仅发送至AWS，更安全</div>
            <br />
            <div>远端模式：如果您的本地IP已遭滥用，使用远端模式可将凭证发送至远端服务器进行操作，匿名性更高</div>
            <div>您可以自行搭建远端服务器，具体方法请访问<Link underline="hover" href="https://github.com/hiDandelion/shizuku-launcher-backend">后端项目仓库</Link>，如不填写远端地址将使用默认托管的服务器</div>
            <br />
            <div>本地+代理模式：操作在本地完成，请求通过代理服务器转发至AWS（此模式暂不可用）</div>
            <div>远端+代理模式：操作在远端完成，请求通过代理服务器转发至AWS，匿名性最高</div>
            <div>您需要提供兼容的代理服务器地址，受支持的协议为：http/https/socks(v5)/socks5/socks4/pac</div>
            <div>正确的格式范例：https://username:password@your-proxy.com:port</div>
            <br />
          </Alert>
        </Collapse>
      </div>
      <div>
        <FormControl sx={{ m: 1 }}>
          <Box>
            <FormLabel id="mode-radio-buttons-group-label">运行模式</FormLabel>
            <Button variant="text" size="small" startIcon={<HelpOutlineIcon />} onClick={() => {
              setModeTipOpen(true);
            }}>帮助</Button>
          </Box>
          <RadioGroup
            row
            aria-labelledby="mode-radio-buttons-group-label"
            defaultValue={1}
            onChange={e => {
              setMode(parseInt(e.currentTarget.value))
              setIpInfomation("");
            }}
          >
            <FormControlLabel value={1} control={<Radio />} label="本地" />
            <FormControlLabel value={2} control={<Radio />} label="远端" />
            {
              //Uncomment this when proxy-agent is ready to use
              //<FormControlLabel value={3} control={<Radio />} label="本地+代理（高级用户）" />
            }
            <FormControlLabel value={4} control={<Radio />} label="远端+代理" />
          </RadioGroup>
        </FormControl>
      </div>
      {mode === 2 ? (
        <>
          <div>
            <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }}>
              <TextField label="远端地址（可选）" variant="outlined" size="small" onChange={(e) => {
                setRemote(e.target.value);
                if (remote === "") {
                  setRemote(defaultRemote)
                }
              }} />
            </FormControl>
          </div>
        </>
      ) : (
        <></>
      )}
      {mode === 3 ? (
        <>
          <div>
            <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }}>
              <TextField label="代理地址" variant="outlined" size="small" onChange={(e) => {
                setProxy(e.target.value);
              }} />
            </FormControl>
          </div>
        </>
      ) : (
        <></>
      )}
      {mode === 4 ? (
        <>
          <div>
            <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }}>
              <TextField label="远端地址（可选）" variant="outlined" size="small" onChange={(e) => {
                setRemote(e.target.value);
                if (remote === "") {
                  setRemote(defaultRemote)
                }
              }} />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ m: 1, width: 0.9, maxWidth: 600 }}>
              <TextField label="代理地址" variant="outlined" size="small" onChange={(e) => {
                setProxy(e.target.value);
              }} />
            </FormControl>
          </div>
        </>
      ) : (
        <></>
      )}
      <div>
        {mode === 1 ? (
          <Typography sx={{ m: 1 }} variant="subtitle2">在本地模式下，如果您使用了限制IP地址追踪，则检查IP可能不会工作。</Typography>
        ) : (
          <></>
        )
        }
        {ipInfomation === "" ? (
          <Button variant="text" size="small" onClick={() => {
            getIp()
          }}>检查IP</Button>
        ) : (
          <Typography sx={{ m: 1 }}>{ipInfomation}</Typography>
        )
        }
      </div>
      <div>
        <FormGroup sx={{ m: 1 }} >
          <FormControlLabel control={<Checkbox size="small" checked={isShowAdvancedOptions} onChange={(e) => {
            setIsShowAdvancedOptions(e.target.checked);
          }} />} label={<Typography variant="subtitle2">Advanced Options (Currently Only Local Mode)</Typography>} />
        </FormGroup>
      </div>
      <Collapse in={alertOpen}>
        <Alert severity="success" onClose={() => { setAlertOpen(false) }}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {alertDescription}
        </Alert>
      </Collapse>
      <Dialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDialogOpen(false); }}>OK</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={{ m: 1 }} />
      <Typography sx={{ m: 1 }} variant="h6">启动实例</Typography>
      <div>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="select-region-label">地区</InputLabel>
          <Select labelId="select-region-label" label="地区" value={liRegion} onChange={e => {
            setLiRegion(e.target.value);
          }}>
            {regions.map((r, i) =>
              <MenuItem key={i} value={r}>{regionsDetail[i]}</MenuItem>
            )}
          </Select>
        </FormControl>
        {isShowAdvancedOptions ? (
          <FormControl sx={{ m: 1, minWidth: 250 }} size="small">
            <TextField label="AMI ID" variant="outlined" size="small" onChange={(e) => {
              setAmi(e.target.value);
            }} />
          </FormControl>
        ) : (
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="select-system-label">操作系统</InputLabel>
            <Select labelId="select-system-label" label="操作系统" value={system} onChange={e => {
              setSystem(e.target.value);;
            }}>
              {systems.map((r, i) =>
                <MenuItem key={i} value={r}>{r}</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
        {isShowAdvancedOptions ? (
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <TextField label="Instance Type" variant="outlined" size="small" onChange={(e) => {
              setType(e.target.value);
            }} />
          </FormControl>
        ) : (
          <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
            <InputLabel id="select-type-label">实例类型</InputLabel>
            <Select labelId="select-type-label" label="实例类型" value={type} onChange={e => {
              setType(e.target.value);
            }}>
              {types.map((r, i) =>
                <MenuItem key={i} value={r}>{r}</MenuItem>
              )}
            </Select>
          </FormControl>
        )}
        <div>
          <FormControl sx={{ m: 1, minWidth: 150 }}>
            <TextField label="密码" type="password" variant="outlined" size="small" onChange={(e) => {
              setPassword(e.target.value);
            }} />
          </FormControl>
        </div>
        {isShowAdvancedOptions ? (
          <div>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <TextField label="Disk Size" variant="outlined" size="small" multiline onChange={(e) => {
                setDiskSize(parseInt(e.target.value));
              }} />
            </FormControl>
          </div>
        ) : (
          <></>
        )}
        {isShowAdvancedOptions ? (
          <div>
            <FormControl sx={{ m: 1, minWidth: 600 }}>
              <TextField label="User Data" variant="outlined" size="small" multiline onChange={(e) => {
                setUserdata(e.target.value);
              }} />
            </FormControl>
          </div>
        ) : (
          <></>
        )}
      </div>
      {isLaunchingInstance ? (<CircularProgress sx={{ m: 1 }} />) : (
        <div>
          <FormControl>
            <Button sx={{ m: 1 }} variant="contained" size="small" onClick={() => {
              launchInstance();
            }}>执行</Button>
          </FormControl>
        </div>)}
      <Divider sx={{ m: 1 }} />
      <Typography sx={{ m: 1 }} variant="h6">查询配额</Typography>
      <div>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="select-region-label">地区</InputLabel>
          <Select labelId="select-region-label" label="地区" value={gqRegion} onChange={e => {
            setGqRegion(e.target.value);
          }}>
            {regions.map((r, i) =>
              <MenuItem key={i} value={r}>{regionsDetail[i]}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      {isGettingQuota ? (<CircularProgress sx={{ m: 1 }} />) : (
        <div>
          <FormControl>
            <Button sx={{ m: 1 }} variant="contained" size="small" onClick={() => {
              getQuota();
            }}>执行</Button>
          </FormControl>
        </div>
      )}
      <Divider sx={{ m: 1 }} />
      <Typography sx={{ m: 1 }} variant="h6">查看实例详细信息</Typography>
      <div>
        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
          <InputLabel id="select-region-label">地区</InputLabel>
          <Select labelId="select-region-label" label="地区" value={ciRegion} onChange={e => {
            setCiRegion(e.target.value);
          }}>
            {regions.map((r, i) =>
              <MenuItem key={i} value={r}>{regionsDetail[i]}</MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
      {isCheckingInstances ? (<CircularProgress sx={{ m: 1 }} />) : (
        <div>
          <FormControl>
            <Button sx={{ m: 1 }} variant="contained" size="small" onClick={() => {
              checkInstances(false);
            }}>执行</Button>
          </FormControl>
        </div>
      )}
      {isCheckedInstances ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>状态</TableCell>
                <TableCell>公网ip</TableCell>
                <TableCell>实例类型</TableCell>
                <TableCell>操作系统</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {instances.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{states.get(row.state)}</TableCell>
                  <TableCell>{row.ip}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>
                    <Box sx={{ '& button': { m: 1 } }}>
                      {idOfInstanceChangingIp === row.id || idOfInstanceTerminating === row.id ? (<CircularProgress />) : (
                        <div>
                          <Button size="small" variant="outlined" onClick={() => changeInstanceIp(row.id)}>更换ip</Button>
                          <Button size="small" variant="outlined" color="error" onClick={() => terminateInstance(row.id)}>终止</Button>
                        </div>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (<></>)}
    </div>
  );
}
