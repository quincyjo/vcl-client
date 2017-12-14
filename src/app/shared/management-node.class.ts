import { Idable } from './idable.interface';

/**
 * Class that contains information for a management node..
 */
export class ManagementNode implements Idable {
  /** The id of the management node. **/
  public id: number;

  constructor(
  /** The hosename of the management node. **/
  public hostname: string  = '',
  /** The ip address for the management node. **/
  public IPaddress: string  = '',
  /** Owner id for management node's owner. **/
  public ownerid: number = 1,
  /** State id for management node's state. **/
  public stateid: number = 0,
  /** Date of the last checkin. **/
  public lastCheckIn: Date = null,
  /** Check interval for the node. **/
  public checkInterval: number  = 12,
  /** The install path for the node. **/
  public installPath: string  = 'install',
  /** If libraries are enabled. **/
  public imageLibEnable: boolean  = false,
  /** The library group id for the image. **/
  public imageLibGroupId: number = null,
  /** Don't know... **/
  public imageLibUser: string = 'vclstaff',
  /** Don't know... **/
  public imageLibKey: string = '/etc/vcl/imagelib.key',
  /** Don't know... **/
  public keys: string = null,
  /** The SSH port for the node. **/
  public sshPort: number  = 22,
  /** The IP configuration method for the node. **/
  public publicIPconfiguration: IPConfiguration = 'dynamicDHCP',
  /** The subnet ip mast for the node. **/
  public publicSubnetMask: string = null,
  /** Default gateway for the node. **/
  public publicDefaultGateway: string = null,
  /** The DNS server responsible for the node. **/
  public publicDNSserver: string = null,
  /** Email address for the system administrator responsible for the node. **/
  public sysadminEmailAddress: string = null,
  /** The shared email for the node. **/
  public sharedMailBox: string = null,
  /** If the node is stand alone. **/
  public NOT_STANDALONE: boolean = false,
  /** Networks which are available to the node. Should be array? **/
  public availableNetworks: string = ''
  ) { }
}

export type IPConfiguration = 'dynamicDHCP'
                            | 'manualDHCP'
                            |'static';
