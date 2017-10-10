import { Idable } from './idable.interface';
import { User } from './user.class';
import { ImageType } from './image-type.class';
import { Platform } from './platform.class';
import { OS } from './os.class';

export class Image implements Idable {
  public id: number;
  public type: ImageType;
  public platform: Platform;
  public os: OS;

  constructor(
    public name: string,
    public prettyName: string = name,
    public ownerId: number = 0,
    public owner?: User,
    public typeId: number = 0,
    public platformId: number = 0,
    public OSId: number = 0,
    public imageMetaId: number = NaN,
    public minRam: number = 0,
    public minProcNumber: number = 0,
    public minProcSpeed: number = 0,
    public minNetwork: number = 0,
    public maxConcurrent: number = 0,
    public reloadTime: number = 10,
    public deleted: boolean = false,
    public test: boolean = false,
    public lastUpdate: Date = null,
    public forCheckout: boolean = true,
    public maxInitialTime: number = 0,
    public project: Project = 'vcl',
    public size: number = 0,
    public architecture: Architecture = 'x86',
    public description: string = '',
    public usage: string = '',
    public basedOffRevisionId: number = null,
  ) { }

}

export type Project = 'vcl' | 'hpc' | 'vclhpc';

export type Architecture = 'x86' | 'x86_64';
