import { Manager } from './Manager';

export class Employee {
  public name?: string;

  public salary?: number;

  public phone?: number;

  public email?: string;

  public address?: string;

  public cpf?: number;

  public department?: string;

  public team?: string;

  public hiringDate?: Date;

  public birthday?: Date;

  public manager?: Manager;
}
